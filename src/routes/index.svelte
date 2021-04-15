<script>
import ResultsMap from "../components/ResultsMap.svelte";

</script>
<style>

.jumbotron-content-background {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2em;
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
}
  

@media only screen and (max-width: 500px) {
  .jumbotron-content-background {
    padding: 1em;
    width: 90%;
  }
}
</style>

<svelte:head>
  <title>RuralNet - Internet Speed Test</title>
</svelte:head>

<!-- BEGIN OF TEMPLATE INSERT-->

<section id="header"> 
  <div class="jumbotron-content-background">
    <h1 class="wow fadeInUp">How fast is your internet?</h1>
    <p class="wow fadeInUp" data-wow-delay=".2s">Test your internet speed to help get high-speed internet to rural areas of Vermont/New Hampshire</p>
    <button class="btn btn-lg video-btn wow fadeInUp">
      <a href="/speed">
        <i class="fa fa-play"></i>Test Your Speed
      </a>
    </button>
    <small class="wow fadeInUp" data-wow-delay=".2s"><a href="map">See Map of Results →</a></small>
  </div>
</section>
<!-- 
<section id="about">
  <div class="container">
  <h2 class="header">About RuralNet</h2>
  <p>More info about the project for a user. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores unde, nulla dolore a porro itaque illum omnis iusto recusandae. Ex cumque molestiae, harum reprehenderit animi impedit quam expedita temporibus. Facilis ab, iste quae recusandae exercitationem dignissimos adipisci voluptatibus deserunt corrupti.</p>
  <p>Short blurb and link for other organizations to get more info.</p>
    <div class="row">
      <div class="col-md-6 feature-item">
        <div class="feature wow fadeInUp">
          <div class="f-icon"><i class="lnr lnr-lock"></i></div>
          <div class="f-description">
            <h4>Thing A...if there is one</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dignissimos voluptatem consequatur in quis provident alias a architecto, sequi, repudiandae, ex eius aperiam nesciunt. Debitis porro adipisci molestias enim natus.</p>
          </div>
        </div>
      </div>
      <div class="col-md-6 feature-item">
        <div class="feature wow fadeInUp" data-wow-delay=".1s">
          <div class="f-icon"><i class="lnr lnr-clock"></i></div>
          <div class="f-description">
            <h4>Thing B...if needed</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat itaque velit delectus accusantium dolor atque ab quidem possimus ut harum dolores suscipit sequi culpa quam, dolore pariatur.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> 
-->

<!-- 
  <section id="iphone-feature">
  <div class="container">
    <div class="row">
      <div class="col-md-5 col-md-offset-7">
        <h2>
          Test Your Internet Speed
        </h2>
        <p>
          What do we need here? Lorem ipsum dolor sit amet.
        </p>
        <button class="btn btn-lg video-btn wow fadeInUp lightbox m"><i class="fa fa-play"></i> Test Your Speed</button>
     
      </div>
    </div>
  </div>
</section> 
-->

<!-- 
  <section id="map-feature">
  <div class="container">
    <div class="row">
      <div class="col-md-2">

      </div>
      <div class="col-md-8">
        <h2>Results Map</h2>
        <ResultsMap />
      </div>
    </div>

      <div class="map-showcase wow fadeInRight">
        <div class="map">
          <img src="images/map.png" alt="">
        </div>
      </div>

    </div>
 
</section> 
-->

<!-- 
  <section id="features">
  <div class="container">
  <h2 class="header">What's Next?</h2>
  <p>More info about the project for a user. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores unde, nulla dolore a porro itaque illum omnis iusto recusandae. Ex cumque molestiae, harum reprehenderit animi impedit quam expedita temporibus. Facilis ab, iste quae recusandae exercitationem dignissimos adipisci voluptatibus deserunt corrupti.</p>
  <p>Short blurb and link for other organizations to get more info.</p>
    <div class="row">
      <div class="col-md-6 feature-item">
        <div class="feature wow fadeInUp">
          <div class="f-icon"><i class="lnr lnr-lock"></i></div>
          <div class="f-description">
            <h4>Thing A...if there is one</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dignissimos voluptatem consequatur in quis provident alias a architecto, sequi, repudiandae, ex eius aperiam nesciunt. Debitis porro adipisci molestias enim natus.</p>
          </div>
        </div>
      </div>
      <div class="col-md-6 feature-item">
        <div class="feature wow fadeInUp" data-wow-delay=".1s">
          <div class="f-icon"><i class="lnr lnr-clock"></i></div>
          <div class="f-description">
            <h4>Thing B...if needed</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat itaque velit delectus accusantium dolor atque ab quidem possimus ut harum dolores suscipit sequi culpa quam, dolore pariatur.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> 
-->


<!-- END OF TEMPLATE INSERT-->