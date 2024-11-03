import * as util from 'util';

async function getPasswordHash(password: string, syncId: string) {
  // Generate pbkdf2 key and return as base64 string
  const encoder = new util.TextEncoder();
  const keyData = encoder.encode(password);
  const salt = encoder.encode(syncId);
  const pbkdf2 = util.promisify(crypto.pbkdf2);
  const derivedKey = await pbkdf2(keyData, salt, 250000, 32, 'sha256');
  const keyString = derivedKey.toString('base64');
  return keyString;
}
async function decryptData(key: string, encryptedBookmarks: string) {
  // Get the required data arrays for decryption
  const keyData = Uint8Array.from(Buffer.from(key, 'base64'));
  const encrypted_bytes = Uint8Array.from(
    Buffer.from(encryptedBookmarks, 'base64')
  );
  const iv = encrypted_bytes.slice(0, 16);
  const tag = encrypted_bytes.slice(-16);
  const enc = encrypted_bytes.slice(16, encrypted_bytes.length - 16);

  // Run decryption and return buffer
  const decipher = crypto.createDecipheriv('aes-256-gcm', keyData, iv, {
    authTagLength: 16,
  });
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(enc), decipher.final()]);
  return decrypted;
}
