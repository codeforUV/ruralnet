<script>
  let clicked = false;
  let promise;
  const getData = async () => {
    clicked = true;
    try {
      //let ipInfoRes = await fetch("https://json.geoiplookup.io");  // this is a free api that allows 10,000 requests per hour
      //let ipInfo = await ipInfoRes.json();
      let res = await fetch("about.json");
      let testResp = await fetch("garbage.json");
      let testjson = await testResp.json();
      console.log(testjson.success);
      let { speed } = await res.json();
      console.log("Server response object:");
      console.log(res);
      console.log("Response JSON parsed:");
      console.log(speed);
      return speed
    } catch (error) {
      return error
    }
  };

  const postData = async () => {
    const post = { clientForm };
    const res = await fetch("about.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    });
    if (res.ok) {
      const result = await res.json();
      console.log("Server response object:");
      console.log(res);
      console.log("Response JSON parsed:");
      console.log(result);
    }
  };

  let clientForm;
  const clickButton = async () => {
    promise = getData();
  };
</script>

<svelte:head>
  <title>Get</title>
</svelte:head>

<h1>REST Test</h1>

<p>How to make RESTful calls in Sapper?</p>
<div>
  <button on:click={clickButton}>Get Speed</button>
  <button on:click={postData}>Post Form</button>
  <input bind:value={clientForm} type="text" placeholder="type something" />
  {#if clicked}
    {#await promise}
      <p>waiting...</p>
    {:then speed}
      <p>Speed: {speed}</p>
    {:catch error}
      <p style="color:red">{error.message}</p>
    {/await}
  {/if}
</div>
