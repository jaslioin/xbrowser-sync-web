<script lang="ts">
  import BookmarkCard from "./BookmarkCard.svelte";
  import { searchString } from "../store/search";
  interface Bookmark {
    id: string;
    title: string;
    url: string;
    description?: string;
    children?: Bookmark[];
    tags?: string[];
  }

  let bookmarks = $state<Bookmark[]>([]);
  if (typeof localStorage !== "undefined") {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
      bookmarks = JSON.parse(storedBookmarks);
      $inspect(bookmarks);
    }
  }

  function searchBookmark(str: string, bm: Bookmark[]) {
    return bm.filter((bookmark) => {
      // Case insensitive search
      const searchLower = str.toLowerCase();
      const titleLower = bookmark.title.toLowerCase();

      // Check if title contains search string
      if (titleLower.includes(searchLower)) {
        return true;
      }

      // Recursively search children if they exist
      if (bookmark.children && bookmark.children.length > 0) {
        const matchingChildren = searchBookmark(str, bookmark.children);
        return matchingChildren.length > 0;
      }

      return false;
    });
  }
  const bookmarksFiltered = $derived(
    searchBookmark($searchString.value, bookmarks)
  );
</script>

{#if bookmarksFiltered.length === 0}
  <div class="text-center py-8">
    <div class="text-xl text-gray-500">No bookmarks loaded</div>
  </div>
{:else}
  <div class="space-y-2">
    {#each bookmarksFiltered as bookmark}
      <div>
        <BookmarkCard {bookmark} />
      </div>
    {/each}
  </div>
{/if}
