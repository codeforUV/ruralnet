<script>
  let text;

  const postData = async () => {
    const res = await fetch('database.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    if (res.ok) {
      const result = await res.json();
      // console.log('Server response object:');
      // console.log(res);
      // console.log('Response JSON parsed:');
      // console.log(result);
      promise = await findData();
    }
  };

  const deleteItem = async (id) => {
    console.log(id);
    const resp = await fetch('database.json', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (resp.ok) {
      console.log('item deleted');
      promise = await findData();
    }
  };

  const findData = async () => {
    const resp = await fetch('database.json');
    const data = await resp.json();
    if (resp.ok) {
      // console.log('Server response object:');
      // console.log(resp);
      // console.log('Response JSON parsed:');
      // console.log(data);
      return data.docs;
    }
  };
  let promise = findData();

  const refreshData = async () => {
    promise = await findData();
  };
</script>

<style>
  .error {
    color: red;
  }
  .button-container {
    margin-bottom: 2rem;
  }
</style>

<h1>Demo interaction with a live mongo database</h1>
<div class="button-container">
  <button on:click={refreshData}>Refresh messages</button>
  <button on:click={postData}>Save message to database</button>
  <input bind:value={text} type="text" placeholder="type something" />
</div>

<div>
  {#await promise}
    <p>Loading...</p>
  {:then docs}
    <h2>Documents</h2>
    <ol>
      {#each docs as { _id, text, date }, i}
        <li>
          <p>
            <strong>Text: </strong>
            {text}
            <svg
              on:click={() => deleteItem(_id)}
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-square-x"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#607D8B"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M10 10l4 4m0 -4l-4 4" />
            </svg>
          </p>
          <p><em>Added: {new Date(date)}</em></p>
        </li>
      {/each}
    </ol>
  {:catch err}
    <p class="error">{err.message}</p>
  {/await}
</div>
