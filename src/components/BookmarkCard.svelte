<script>
    import BookmarkCard from "./BookmarkCard.svelte"; // Add this import

    const { bookmark } = $props();
    let isExpanded = $state(false);
</script>

<div class="pl-4">
    {#if bookmark.url}
        <div class="flex items-center gap-2 py-1 hover:bg-base-200 rounded px-2">
            <span>🔗</span>
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer" class="link link-primary text-sm truncate block">{bookmark.title}</a>
        </div>
    {:else}
        <div class="flex flex-col">
            <button 
                class="flex items-center gap-2 py-1 hover:bg-base-200 rounded px-2 text-sm truncate "
                onclick={() => (isExpanded = !isExpanded)}
            >
                <span class="text-lg">{isExpanded ? '📂' : '📁'}</span>
                <span>{bookmark.title}</span>
            </button>
            
            {#if isExpanded && bookmark.children}
                <div class="border-l border-base-300 ml-2">
                    {#each bookmark.children as child}
                        <BookmarkCard bookmark={child} />
                    {/each}
                </div>
            {/if}
        </div>
    {/if}

  

</div>
