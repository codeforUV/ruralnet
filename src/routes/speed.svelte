<script>
  let clicked = false;
  let promise;
  const measureSpeed = async () => {
    clicked = true;
    try {
      let res = await fetch('about.json');
      let { speed } = await res.json();
      console.log('Server response object:');
      console.log(res);
      console.log('Response JSON parsed:');
      console.log(speed);
      return speed;
    } catch (error) {
      return error;
    }
  };
</script>

<div>
  <button on:click={measureSpeed}>Measure Speed</button>
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
