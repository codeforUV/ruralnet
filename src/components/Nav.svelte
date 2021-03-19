<script>
  export let segment;
</script>

<style>
  
</style>

<nav>
  <ul>
    <li><a aria-current={segment === undefined ? 'page' : undefined} href=".">Home</a></li>
    <li><a aria-current={segment === 'about' ? 'page' : undefined} href="about">About</a></li>
    <li>
      <a aria-current={segment === 'database' ? 'page' : undefined} href="database">Test Database</a>
    </li>
    <li>
      <a aria-current={segment === 'speed' ? 'page' : undefined} href="speed">Measure Speed</a>
    </li>
    <li>
      <a aria-current={segment === 'speedDatabase' ? 'page' : undefined} href="speedDatabase">Speed Test Results</a>
    </li>
  </ul>
</nav>
