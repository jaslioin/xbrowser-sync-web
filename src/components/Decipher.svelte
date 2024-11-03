<script>
  import { decriptBookmarks } from "../utils/decipher";

  const handleClick = async () => {
    try {
      const result = await decriptBookmarks({
        pw: "asd",
        syncId: "bdf7b0a552c347cc8479a7b287a43c00",
        encryptedBookmarks: "dsAxxN4gQHvsr/5BPF8F1G84oxlTroAbDX++ha8JgHJgjE8iXvQH2+7t3daG3r2WPsmLRS/KWdc/FwntiAYqSZIzQQQn6VcKYFVCdA/ZeSjZhxYh3SnG8i/FA6zgI/hBWvbk4W/xgW14tvA1lNGHAYFU6ZAXhOlR"
      });
      console.log(result);
    } catch (error) {
      console.error("Error decrypting bookmarks:", error);
    }
  }
</script>

<button on:click={handleClick} class="btn btn-primary">
  Decrypt Bookmarks
</button>
