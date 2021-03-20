<script>
  import Footer from '../components/Footer.svelte';
import Nav from '../components/Nav.svelte';

  export let segment;
</script>

<style>
  main {
    position: relative;
    /* max-width: 56em; */
    background-color: white;
    box-sizing: border-box;
  }
  
</style>

<Nav {segment} />

<main>
  <slot />
</main>

<Footer />
