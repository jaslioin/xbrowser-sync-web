<script lang="ts">
  import BookmarkCard from "./BookmarkCard.svelte";
  import { searchString } from "../store/search";
  import type { Bookmark, SearchBookmark } from "../types/bookmark";


  let bookmarks = $state<Bookmark[]>([]);
  if (typeof localStorage !== "undefined") {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
      bookmarks = JSON.parse(storedBookmarks);
      $inspect(bookmarks);
    }
  }

  function searchBookmark(str: string, bm: Bookmark[]): SearchBookmark[] {
    return bm.map((bookmark) => {
      // Case insensitive search
      const searchLower = str.toLowerCase();
      const titleLower = bookmark.title.toLowerCase();

      // Check if title contains search string
      const isMatch =
        searchLower === "" ? undefined : titleLower.includes(searchLower);

      // Recursively search children if they exist
      if (bookmark.children && bookmark.children.length > 0) {
        const children = searchBookmark(str, bookmark.children);
        return {
          ...bookmark,
          isMatch,
          children,
        };
      }

      return {
        ...bookmark,
        isMatch,
      };
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
