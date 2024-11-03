<script>
    import BookmarkCard from "./BookmarkCard.svelte"; // Add this import

    const { bookmark } = $props();
    let isExpanded = $state(false);
</script>

<div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow my-2">
    <div class="card-body">
        <h2 class="card-title">
            {#if bookmark.url}
                <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="link link-primary"
                >
                    {bookmark.title}
                </a>
            {:else}
                <button
                    class="text-gray-700 text-left w-full"
                    onclick={() => (isExpanded = !isExpanded)}
                >
                    {isExpanded ? "📂" : "📁"}
                    {bookmark.title}
                </button>
                {#if isExpanded && bookmark.children}
                    <div class="ml-4 mt-2">
                        {#each bookmark.children as child}
                            <BookmarkCard bookmark={child} />
                        {/each}
                    </div>
                {/if}
            {/if}
        </h2>
        {#if bookmark.description}
            <p class="text-gray-600">{bookmark.description}</p>
        {/if}
        {#if bookmark.tags && bookmark.tags.length > 0}
            <div class="flex gap-2 mt-2">
                {#each bookmark.tags as tag}
                    <span class="badge badge-ghost truncate max-w-[150px]">{tag}</span>
                {/each}
            </div>
        {/if}
    </div>
</div>
