<script lang="ts">
  import debounce from "lodash/debounce";
  import { searchString } from "../store/search";
  import type { Bookmark, SearchBookmark } from "../types/bookmark";
  import BookmarkGridItem from "./BookmarkGridItem.svelte";
  let bookmarks = $state<Bookmark[]>([]);
  let currentPage = $state(1);
  if (typeof localStorage !== "undefined") {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
      bookmarks = JSON.parse(storedBookmarks);
    }
  }
  $effect(() => {
    // search string change, reset current page
    $searchString;
    currentPage = 1;
  });
  function searchBookmark(str: string, bm: Bookmark[]): SearchBookmark[] {
    return bm.flatMap((bookmark) => {
      // Case insensitive search
      const isPathSearch = str.toLowerCase().startsWith("path:");
      const searchKey = isPathSearch ? str.toLowerCase().slice(5) : str;
      const searchLower = str.toLowerCase();
      const titleLower = bookmark.title.toLowerCase();
      const urlLower = bookmark.url?.toLowerCase() || "";
      const descriptionLower = bookmark.description?.toLowerCase() || "";
      const tagsLower = bookmark.tags?.map((t) => t.toLowerCase()) || [];

      // Check if any fields contain search string
      const isMatch = isPathSearch
        ? titleLower.includes(searchKey)
        : titleLower.includes(searchLower) ||
          urlLower.includes(searchLower) ||
          descriptionLower.includes(searchLower) ||
          tagsLower.some((tag) => tag.includes(searchLower));

      // Build the path for this bookmark
      const currentPath = bookmark.title;

      // Recursively search children if they exist
      if (bookmark.children && bookmark.children.length > 0) {
        return searchBookmark(str, bookmark.children).map((child) => ({
          ...child,
          path: `${currentPath}/${child.path || child.title}`,
        }));
      }

      // For leaf nodes, only include if matching
      return isMatch
        ? [
            {
              ...bookmark,
              isMatch,
              path: currentPath,
            },
          ]
        : [];
    });
  }
  const bookmarksFiltered = $derived(
    searchBookmark($searchString.value, bookmarks)
  );
  const setPage = debounce((page: number) => (currentPage = page), 400);
</script>

{#if bookmarksFiltered.length === 0}
  <div class="text-center py-8">
    <div class="text-xl text-gray-500">No bookmarks loaded</div>
  </div>
{:else}
  <div class="flex flex-col gap-4">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 max-w-full overflow-x-hidden"
    >
      {#each bookmarksFiltered.slice((currentPage - 1) * 10, currentPage * 10) as bookmark}
        <BookmarkGridItem {bookmark} />
      {/each}
    </div>

    <div
      class="join self-center w-min justify-center sticky left-0 bottom-8 bg-base-300/80 backdrop-blur-sm shadow-lg rounded-full p-1.5 hover:shadow-xl transition-all duration-200 mt-4 border border-base-content/10"
    >
      <button
        class="join-item btn btn-sm btn-ghost hover:btn-primary"
        disabled={currentPage === 1}
        onclick={() => {
          currentPage--;
          window.scrollTo({ top: 0, behavior: "instant" });
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>

      <span class="join-item btn btn-sm btn-ghost no-animation pointer-events-none">
        {currentPage}
      </span>

      <button
        class="join-item btn btn-sm btn-ghost hover:btn-primary"
        disabled={currentPage * 10 >= bookmarksFiltered.length}
        onclick={() => {
          currentPage++;
          window.scrollTo({ top: 0, behavior: "instant" });
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
{/if}
