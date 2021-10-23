<script>
  import SpeedTest from "../components/SpeedTest.svelte";
  import Survey from "../components/Survey.svelte";

    let showDefault = false;
    let showSpeedTest = true;
    let showSurvey = false ;

    let showSurveyBtn = false
    let surveyFinished = false

  const renderSpeedTest = () => {
    console.log(`renderspeedtest`)
    showDefault = false;
    showSpeedTest = true;
    showSurvey = false;
  }

  const renderSurvey = () => {
    console.log(`rendersurvey`)
    showDefault = false;
    showSpeedTest = false;
    showSurvey = true;
  }

  const showSurveyButton = () => {
    showSurveyBtn = true
  }

</script>

<style>
  .jumbotron-content-background {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 25px;
    padding-top: 2em;
    width: 50%;
    min-height: 25em;
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  button i {
    margin-right: 10px;
  }

  .content > * {
    margin: 1em 0;
  }

  @media only screen and (max-width: 650px) {
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
    <div class="content">
{#if showDefault === true}
    <h1 class="wow fadeInUp">Take a Speed Test</h1>  
      <!-- <p class="wow fadeInUp" data-wow-delay=".2s">
        Test your internet speed!
      </p> -->
      <button class="btn btn-lg btn-blue video-btn wow fadeInUp" on:click={renderSpeedTest}>
          <i class="fa fa-play" />Begin Test
      </button>
      <small class="wow fadeInUp" data-wow-delay=".2s"><a href="map">Skip to Results Map →</a></small>

  
{:else if showSpeedTest === true}
  <!-- <h1 class="wow fadeInUp">Speed Test</h1> -->
  <SpeedTest on:testComplete={showSurveyButton}/>
  {#if showSurveyBtn === true}
    <!-- <p>Take a quick survey to give us a better indicator about your speed test results!</p> -->
    <button id='survey' class="btn btn-blue" on:click={renderSurvey}>Take A Quick Survey!</button>
  {/if}
  <small class="wow fadeInUp" data-wow-delay=".2s"><a href="map">Skip to Results Map →</a></small>
{:else if showSurvey === true}
  {#if surveyFinished === false}
    <!-- <h1 class="wow fadeInUp">Survey</h1> -->
    <Survey bind:submitted={surveyFinished}/>
  {:else}
    <p>Thanks for participating!</p>
    <a href="/map">See internet speeds in the Upper Valley</a>
  {/if}
{:else}
    <p>Oops...unhandled condition in index.svelte route</p>
{/if}
    </div>
  </div>
</section>


