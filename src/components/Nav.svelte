<script>
  export let segment;

</script>

<!-- <nav>
  <ul>
    <li><a aria-current={segment === undefined ? 'page' : undefined} href=".">Home</a></li>
    <li>
      <a aria-current={segment === 'about' ? 'page' : undefined} href="about">About</a>
    </li>
    <li>
      <a aria-current={segment === 'database' ? 'page' : undefined} href="database">Test Database</a>
    </li>
    <li>
      <a aria-current={segment === 'newSpeed' ? 'page' : undefined} href="newSpeed">Measure Speed</a>
    </li>
    <li>
      <a aria-current={segment === 'yourTests' ? 'page' : undefined} href="yourTests">Your Speed Test Results</a>
    </li>
    <li>
      <a aria-current={segment === 'speedDatabase' ? 'page' : undefined} href="speedDatabase">All Speed Test Results</a>
    </li>
    <li>
      <a aria-current={segment === 'map' ? 'page' : undefined} href="map">Results Map</a>
    </li>
    <li>
      <a aria-current={segment === 'map' ? 'page' : undefined} href="map">Results Map</a>
    </li>
  </ul>
</nav> -->

<header id="main-nav">
  <div class="container">
    <a id="navigation" href="#"><i class="fa fa-bars" /></a>

    <div id="slide_out_menu">
      <a href="#" class="menu-close"><i class="fa fa-times" /></a>
      <!-- 
      <div class="logo"><img src="images/logo-white.png" alt=""></div> -->
      <p>ruralnet</p>
      <ul>
          <!-- <li><a aria-current={segment === undefined ? 'page' : undefined} href=".">Home</a></li> -->
          <li><a aria-current={segment === 'about' ? 'page' : undefined} href="about">About</a></li>
          <!-- <li><a aria-current={segment === 'speed' ? 'page' : undefined} href="speed">Speed Test</a></li> -->
          <!-- <li><a aria-current={segment === 'yourTests' ? 'page' : undefined} href="yourTests">Your Speedtests</a></li> -->
          <li><a aria-current={segment === 'map' ? 'page' : undefined} href="map">Results Map</a></li>
          <!-- <li><a href="speed" class="btn btn-blue"> Test Your Speed</a></li> -->
      </ul>

      <div class="slide_out_menu_footer">
        <ul class="socials">
          <li><a href="https://twitter.com"><i class="fa fa-twitter" /></a></li>
          <li><a href="https://facebook.com"><i class="fa fa-facebook" /></a></li>
        </ul>
      </div>
    </div>

    <div class="row" id="desktop-menu">
      <div class="col-md-2 text-center">
        <a href="."><p>RuralNet</p></a>
      </div>
      <div class="col-md-8">
        <ul class="left">
          <!-- <li><a aria-current={segment === undefined ? 'page' : undefined} href=".">Home</a></li> -->
          <li><a aria-current={segment === 'about' ? 'page' : undefined} href="about">About</a></li>
          <!-- <li><a aria-current={segment === 'speed' ? 'page' : undefined} href="speed">Speed Test</a></li> -->
          <!-- <li><a aria-current={segment === 'yourTests' ? 'page' : undefined} href="yourTests">Your Speedtests</a></li> -->
          <li><a aria-current={segment === 'map' ? 'page' : undefined} href="map">Results Map</a></li>
        </ul>
      </div>

      <!-- <div class="col-md-2">
        <ul class="right">
          <li><a href="speed" class="btn btn-blue">Test Your Speed</a></li>
        </ul>
      </div> -->
    </div>
  </div>
</header>
<!-- //Main Nav -->

<style>
</style>
