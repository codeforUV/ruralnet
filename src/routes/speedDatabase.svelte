<script>
    const deleteItem = async (id) => {
      console.log(id);
      const resp = await fetch('speedDB/speedDB.json', {
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
      const resp = await fetch('speedDB/speedDB.json');
      const data = await resp.json();
      if (resp.ok) {
        return data.docs;
      }
    };
    let promise = findData();
  
    const refreshData = async () => {
      promise = await findData();
    };

    const getTSV = async () => {
      // this is a hairbrained attempt at protecting the data from non-hackers - easily 
      var pw = prompt("Enter the Password");
      let pwCheck = await fetch(`speedDB/export.json?r=${pw}`, {
        method: 'POST'
      })
      pwCheck = await pwCheck.json();
      if (pwCheck.trust) {
        let downloadAnchor = document.createElement('a');
        downloadAnchor.href = `speedDB/export.json?r=${pw}`;
        downloadAnchor.download = true;
        downloadAnchor.click();
      } else {
        alert('Sorry, you do not have access to this resource');
      }
  }
  
  </script>
  
  <h1>Demo interaction with a live mongo database</h1>
  <div class="button-container">
    <button class="btn" on:click={refreshData}>Refresh messages</button>
  </div>
  <div class="button-container">
    <button class="btn btn-blue" on:click={getTSV}>Export TSV of data</button>
  </div>
  
  <div>
    {#await promise}
      <p>Loading...</p>
    {:then docs}
      <h2>Test Results</h2>
      <ol>
        {#each docs as { _id, downloadSpeed, city, internetProvider, date, userID }, i}
          <li>
            <p>
              <strong>Speed: </strong>
              {downloadSpeed} Mbps
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
            <p><em>{internetProvider}, {city || "location unknown"}, {date}</em></p>
            <p>{userID}</p>
          </li>
        {/each}
      </ol>
    {:catch err}
      <p class="error">{err.message}</p>
    {/await}
  </div>
  
