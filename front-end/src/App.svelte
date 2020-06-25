<script>
  import _ from 'lodash'

  let searchTerm;
  let searchRequest = Promise.resolve([]);
  let searchResults = [];
  const youtubeSearchEndpoint = "https://www.googleapis.com/youtube/v3/search"

  const buildParams = () => {
    const params = {
      key: "AIzaSyCOo4tTcdgHliSUJIaWEiTnQxZHK0rRHkk",
      type: "video",
      part: "snippet",
      maxResults: 25,
      q: searchTerm
    }
    return new URLSearchParams(params).toString()
  }

  const search = async () => {
    const response = await fetch(`${youtubeSearchEndpoint}?${buildParams()}`)
    const json = await response.json()
    searchResults = json.items
  }

  const pending = {}

  const download = id => {
    const url = `https://www.youtube.com/watch?v=${id}`
    pending[id] = fetch(`http://localhost:4567?url=${url}`)
  }

</script>

<div class="w-3/4 mx-auto">

  <input
    class="w-full mb-2 p-2 rounded"
    placeholder="Search YouTube"
    bind:value={searchTerm}
    on:keyup={_.debounce(search, 500)}
  >

  {#each searchResults as { snippet, id: { videoId } } }
    <div
      class="w-full border rounded overflow-hidden flex items-center mb-2 cursor-pointer"
      on:click={() => download(videoId, 300)} >
      <img class="h-12" src={snippet.thumbnails.default.url}>
      <div class="mx-6">{@html snippet.title}</div>
      {#if pending[videoId]}
        {#await pending[videoId]}
          <div class="bg-yellow-300 p-2 rounded">Downloading...</div>
        {:then}
          <div class="bg-green-300 p-2 rounded">Done</div>
        {/await}
      {/if}
    </div>
  {/each}
</div>
