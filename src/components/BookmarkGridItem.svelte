<script lang="ts">
  import type { SearchBookmark } from "../types/bookmark";
  import { getScraperUrl } from "../utils/get-scraper-url";

  const { bookmark }: { bookmark: SearchBookmark } = $props();
</script>

{#if bookmark.url}
  <div
    class="card bg-base-100 shadow-xl hover:shadow-2xl hover:bg-base-200 transition-all duration-200 ease-in-out"
  >
    <div class="card-body p-4">
      <div class=" card-title flex items-center gap-2">
        <img
          src={`https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}&sz=32`}
          alt={`Favicon for ${bookmark.title}`}
          class="w-6 h-6"
          loading="lazy"
        />
        <div class="flex flex-col">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            class="card-title text-sm hover:text-primary transition-colors line-clamp-2 break-words group-hover:text-primary"
          >
            {bookmark.title}
          </a>
        </div>
      </div>
      {#if bookmark.path}
        <p class="text-xs text-base-content/60 truncate" title={bookmark.path}>
          {bookmark.path}
        </p>
      {/if}
      {#if bookmark.description}
        <p
          class="text-sm text-base-content/70 line-clamp-2"
          title={bookmark.description}
        >
          {bookmark.description}
        </p>
      {/if}
      {#if bookmark.tags && bookmark.tags.length > 0}
        <div class="flex flex-wrap gap-1">
          {#each bookmark.tags as tag}
            <span class="badge badge-sm badge-outline">{tag}</span>
          {/each}
        </div>
      {/if}

      {#if bookmark.url}
        <div class="w-full h-32 bg-base-200 rounded-lg overflow-hidden">
          <img
            src={getScraperUrl(bookmark.url)}
            alt={`Preview of ${bookmark.title}`}
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      {/if}
    </div>
  </div>
{:else}
  <div
    class="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:bg-base-200 transition-all duration-200 ease-in-out"
  >
    <div class="card-body p-4">
      <div class="flex items-center gap-2">
        <span class="text-lg">📁</span>
        <div class="flex flex-col">
          <h3 class="card-title text-sm">{bookmark.title}</h3>
          {#if bookmark.path}
            <p class="text-xs text-base-content/60 truncate">{bookmark.path}</p>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
