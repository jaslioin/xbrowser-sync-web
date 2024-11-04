<script lang="ts">
  import BookmarkCard from "./BookmarkCard.svelte";
  interface Bookmark {
    id: string;
    title: string;
    url: string;
    description?: string;
    tags?: string[];
  }

  let bookmarks: Bookmark[] = [];

  $: {
    if (typeof localStorage !== "undefined") {
      const storedBookmarks = localStorage.getItem("bookmarks");
      if (storedBookmarks) {
        bookmarks = JSON.parse(storedBookmarks);
        console.dir(bookmarks);
      }
    }
  }
</script>

  {#if bookmarks.length === 0}
    <div class="text-center py-8">
      <div class="text-xl text-gray-500">No bookmarks loaded</div>
      <p class="text-sm text-gray-400 mt-2">
        Enter your credentials to load your bookmarks
      </p>
    </div>
  {:else}
    <div class="space-y-2">
      {#each bookmarks as bookmark}
        <div >
          <BookmarkCard {bookmark} />
        </div>
      {/each}
    </div>
  {/if}
