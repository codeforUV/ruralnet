<script>
  import { onMount } from 'svelte';
  async function populateInfo() {
    let r = await fetch('/id/deploymentInfo.json');
    let j = await r.json();
    return j;
  }
  var headline, about;
  onMount(async () => {
    let deets = await populateInfo();
    console.log(deets);
    headline = deets.headline;
    about = deets.about;
  });
</script>
<style>
  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

<figure>
  <img alt="Borat" src="great-success.png" />
  <figcaption>HIGH FIVE!</figcaption>
</figure>

<p><strong>{headline} - {about}</strong></p>
