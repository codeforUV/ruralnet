<script>
  export let segment;
</script>

<style>
  
</style>

<!-- <nav>
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
    <li>
      <a aria-current={segment === 'map' ? 'page' : undefined} href="map">Results Map</a>
    </li>
  </ul>
</nav> -->

<header id="main-nav">
  <div class="container">

    <a id="navigation" href="#"><i class="fa fa-bars"></i></a>

    <div id="slide_out_menu">
      <a href="#" class="menu-close"><i class="fa fa-times"></i></a>
      <!-- 
      <div class="logo"><img src="images/logo-white.png" alt=""></div> -->
      <p>ruralnet</p>
      <ul>
        <li><a aria-current={segment === undefined ? 'page' : undefined} href=".">Home</a></li>
          <li><a aria-current={segment === 'about' ? 'page' : undefined} href="about">About</a></li>
          <li><a aria-current={segment === 'speed' ? 'page' : undefined} href="speed">Test</a></li>
          <li><a aria-current={segment === 'map' ? 'page' : undefined} href="map">Results Map</a></li>
          <li><a aria-current={segment === 'speedDatabase' ? 'page' : undefined} href="speedDatabase">Results List</a></li>
        <li><a href="#Test" class="btn btn-blue"> Test Your Speed</a></li>
      </ul>

      <div class="slide_out_menu_footer">
        <ul class="socials">
          <li><a href="https://twitter.com"><i class="fa fa-twitter"></i></a></li>
          <li><a href="https://facebook.com"><i class="fa fa-facebook"></i></a></li>
        </ul>
      </div>
    </div>

    <div class="row" id="desktop-menu">
      <div class="col-md-2 text-center">
        <a href="."><p>RuralNet</p></a>
        <!-- <a href="#" class="logo"><img src="images/logo.png" alt="New Providence"></a> -->
      </div>
      <div class="col-md-8">
        <ul class="left">
          <li><a aria-current={segment === undefined ? 'page' : undefined} href=".">Home</a></li>
          <li><a aria-current={segment === 'about' ? 'page' : undefined} href="about">About</a></li>
          <li><a aria-current={segment === 'speed' ? 'page' : undefined} href="speed">Test</a></li>
          <li><a aria-current={segment === 'map' ? 'page' : undefined} href="map">Results Map</a></li>
          <li><a aria-current={segment === 'speedDatabase' ? 'page' : undefined} href="speedDatabase">Results List</a></li>
        </ul>
      </div>
      
      <div class="col-md-2">
        <ul class="right">
            <li><a href="#Test" class="btn btn-blue">Test Your Speed</a></li>
        </ul>
      </div>
    </div>
  </div>
</header><!-- //Main Nav -->