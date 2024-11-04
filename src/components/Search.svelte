<script lang="ts">
  import { searchString } from "../store/search";
  const { class: className = "" } = $props();

  let hasCache = $state(false);

  $effect(() => {
    if (typeof localStorage !== "undefined") {
      const storedBookmarks = localStorage.getItem("bookmarks");
      hasCache = !!storedBookmarks;
    }
  });

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    searchString.set({ value: target.value });
    console.log(searchString.value);
  }
</script>

<search class={`w-full ${className ?? ""} ${hasCache ? "" : "hidden"}`}>
  <input
    type="search"
    placeholder="Search bookmarks..."
    class="input input-bordered w-full"
    oninput={handleInput}
  />
</search>
<!-- <div class="flex gap-2 px-4">
    <button class="btn btn-sm btn-outline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4v16m8-8H4"
        ></path>
      </svg>
      Add New
    </button>
    <button class="btn btn-sm btn-outline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        ></path>
      </svg>
      Export
    </button>
    <button class="btn btn-sm btn-outline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        ></path>
      </svg>
      Import
    </button>
    <button class="btn btn-sm btn-outline btn-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        ></path>
      </svg>
      Delete Selected
    </button>
  </div> -->
