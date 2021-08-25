<script>
import SpeedTest from "../components/SpeedTest.svelte";

  let showDefault = true;
  let showSpeedTest = false;
  let showSurvey = false

const renderSpeedTest = () => {
  console.log(`renderspeedtest`)
 showDefault = false;
 showSurvey = false;
 showSpeedTest = true;
}

</script>

<style>
  .jumbotron-content-background {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 25px;
    padding: 2em;
    width: 50%;
    min-height: 25em;
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
{#if showDefault === true}

    <h1 class="wow fadeInUp">How fast is your internet?</h1>
    <p class="wow fadeInUp" data-wow-delay=".2s">
      Test your internet speed to help get high-speed internet to rural areas of Vermont/New
      Hampshire
    </p>
    <button class="btn btn-lg btn-blue video-btn wow fadeInUp" on:click={renderSpeedTest}>
        <i class="fa fa-play" />Test Your Speed
    </button>
    <small class="wow fadeInUp" data-wow-delay=".2s"><a href="map">See Map of Results →</a></small>
  
{:else if showSpeedTest === true}
  <h1 class="wow fadeInUp">Speed test</h1>
  <SpeedTest/>
{:else if showSurvey === true}
  <h1 class="wow fadeInUp">Survey</h1>
{:else}

{/if}
</div>
</section>


