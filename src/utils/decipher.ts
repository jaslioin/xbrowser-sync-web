import lzutf8 from 'lzutf8';

async function getPasswordHashWeb(password: string, syncId: string) {
    // Convert password and syncId to Uint8Array
    const encoder = new TextEncoder();
    const keyData = encoder.encode(password);
    const salt = encoder.encode(syncId);

    // Import the password as a raw key
    const baseKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        'PBKDF2',
        false,
        ['deriveBits', 'deriveKey']
    );

    // Derive the key using PBKDF2
    const derivedKey = await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 250000,
            hash: 'SHA-256'
        },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        true, // extractable
        ['encrypt', 'decrypt']
    );

    // Export the key as raw bytes and convert to base64
    const exportedKey = await crypto.subtle.exportKey('raw', derivedKey);
    return btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
}



async function decryptDataNodeToWeb(key: string, encryptedBookmarks: string) {

    // Decode the key and encrypted data from base64
    const keyData = Uint8Array.from(atob(key), c => c.charCodeAt(0));
    const encryptedData = Uint8Array.from(atob(encryptedBookmarks), c => c.charCodeAt(0));

    // Extract IV, tag, and encrypted content
    const iv = encryptedData.slice(0, 16);
    const tag = encryptedData.slice(-16);
    const enc = encryptedData.slice(16, encryptedData.length - 16);

    // Combine enc and tag as required by Web Crypto API
    const encryptedContent = new Uint8Array(enc.length + tag.length);
    encryptedContent.set(enc);
    encryptedContent.set(tag, enc.length);

    // Import the key
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'AES-GCM' },
        false,
        ['decrypt']
    );

    // Decrypt the data
    const decrypted = await crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: iv,
            tagLength: 128 // 16 bytes
        },
        cryptoKey,
        encryptedContent
    );

    return new Uint8Array(decrypted);
}



export const decriptBookmarks = async ({encryptedBookmarks,pw,syncId}:{pw:string,syncId:string,encryptedBookmarks:string}) => {

    // demo
    // const pw = 'asd';
    // const syncId = 'bdf7b0a552c347cc8479a7b287a43c00';
    // const encryptedBookmarks = `dsAxxN4gQHvsr/5BPF8F1G84oxlTroAbDX++ha8JgHJgjE8iXvQH2+7t3daG3r2WPsmLRS/KWdc/FwntiAYqSZIzQQQn6VcKYFVCdA/ZeSjZhxYh3SnG8i/FA6zgI/hBWvbk4W/xgW14tvA1lNGHAYFU6ZAXhOlR`;


    // Generate the password hash
    // const key = await getPasswordHash(pw, syncId);
    const key = await getPasswordHashWeb(pw, syncId);



    // Decrypt the encrypted data using password hash
    // const decryptedData = await decryptData(key, encryptedBookmarks);
    const decryptedData = await decryptDataNodeToWeb(key,encryptedBookmarks)


    // Decompress the decrypted data to it's original json and beautify
    const decryptedJson = lzutf8.decompress(decryptedData);
    // const beautifiedJson = JSON.stringify(JSON.parse(decryptedJson), null, 2);
    return decryptedJson
}
