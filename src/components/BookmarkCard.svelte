<script lang="ts">
  import type { SearchBookmark } from "../types/bookmark";
  import BookmarkCard from "./BookmarkCard.svelte";

  const { bookmark }: { bookmark: SearchBookmark } = $props();
  let isExpanded = $state(false);
</script>

{#if bookmark.url}
  <div
    class="flex items-center gap-2 py-1 hover:bg-base-200 rounded px-2 my-1"
    class:bg-stone-300={bookmark.isMatch}
    class:opacity-30={bookmark.isMatch === false}
  >
    <span>🔗</span>
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      class="link link-primary text-sm truncate block">{bookmark.title}</a
    >
  </div>
{:else}
  <div class="flex flex-col">
    <button
      class="flex items-center gap-2 py-1 hover:bg-base-200 rounded px-2 text-sm truncate"
      onclick={() => (isExpanded = !isExpanded)}
    >
      <span class="text-lg">{isExpanded ? "📂" : "📁"}</span>
      <span>{bookmark.title}</span>
    </button>

    {#if isExpanded && bookmark.children}
      <div class="border-l border-base-300 ml-4">
        {#each bookmark.children as child}
          <BookmarkCard bookmark={child} />
        {/each}
      </div>
    {/if}
  </div>
{/if}
