<script>
  import Footer from '../components/Footer.svelte';
  import Nav from '../components/Nav.svelte';
  import CookieBanner from '../components/CookieBanner.svelte';

  export let segment;

</script>

<Nav {segment} />

{#if segment === undefined}
  <main>
    <slot />
  </main>
{:else}
  <div class="content">
    <main>
      <slot />
    </main>
  </div>
{/if}
<CookieBanner/>
<Footer />

<style>
  main {
    position: relative;
    background-color: white;
    box-sizing: border-box;
  }

  .content {
    max-width: 800px;
    margin: auto;
    /* padding: 0 1.5em;
    margin-top: 150px; */
  }

</style>
