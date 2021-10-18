<script>
  import ApiMap from '../components/APIMap.svelte';
  import ResultsMap from '../components/ResultsMap.svelte';
  import TestResultsList from '../components/TestResultsList.svelte';

  const findData = async () => {
        const resp = await fetch('speedDB/speedDB.json');
        const data = await resp.json();
        if (resp.ok) {
            console.log('Data Found');
            // console.log(data.docs[1]);
            // buildPointGraphic(data.docs[1])
            return data.docs;
        } else {
            return [];
        }
    };

    const promise = findData()

</script>

<style>
  .user-circle {
    width: 20px;
    height: 20px;
    background-color: black;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
  }

  .legend {
    display: flex;
    width: 100%;
  }

  .legend-user {
    margin: 20px 0;
  }

  .yellow {
    background-color: #f1f7b2;
  }

  .green {
    background-color: #b7de85;
  }

  .red {
    background-color: #c5442f;
  }

  .color-gradient {
    width: 100%;
    height: 20px;
    background: rgb(197, 68, 47);
    background: linear-gradient(
      90deg,
      rgba(197, 68, 47, 1) 16%,
      rgba(241, 247, 178, 1) 49%,
      rgba(16, 110, 62, 1) 87%
    );
  }

  .gradient-values {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .results-container {
    display: flex;
  }

  .map-container {
    width: 50%;
    padding-right: 1em
  }

  .personal-results-container {
    width: 50%;
    padding-left: 1em
  }

  .explination-container {
    width: 100%;
    padding: 0 0em
  }

  #jump-to-link {
    display: none;
  }

  /* X-Small devices (portrait phones, less than 576px)*/
@media (max-width: 575.98px) { 

  .results-container {
    flex-direction: column;
  }

  .map-container {
    width: 100%;
    padding-right: 0
  }

  .explination-container {
    width: 100%;
    padding-left: 0;
  }

  .personal-results-container {
    width: 100%;
    padding-left: 0
  }

  #jump-to-link {
    display: block;
  }

 }

/* Small devices (landscape phones, less than 768px)*/
@media (max-width: 767.98px) {  }

/* Medium devices (tablets, less than 992px)*/
@media (max-width: 991.98px) {  }

</style>

<h1>Results</h1>

<!-- <button on:click={handleJumpToSpeedResults}>Jump to past speedtest results</button> -->
<a id="jump-to-link" href='/map#your-results'>Jump to past speedtest results</a>

<div class="results-container">

  <div id="map" class="map-container">
    <h2>Map of All Speed Tests</h2>
    {#await promise}
        <p>Loading Results Map...</p>
    {:then docs}
        {#if docs.length === 0}
          <p>Looks like you haven't tested yet. <a href="/index">Take a test.</a></p>
        {:else}
        <small>
          <a
            href="https://codeforamerica.maps.arcgis.com/apps/webappviewer/index.html?id=c67c46ce5e69421faf833305a681138a"
            target="_blank"
            rel="noopener noreferrer"
          >
            View larger map
          </a>
        </small>
          <ApiMap speedData={docs} />
        {/if}
    {:catch err}
        <p class="error">{err.message}</p>
    {/await}
    <div class="explination-container">
      <h3>User Submitted Speeds</h3>
      <div class="legend">
        <div class="legend-user">
          <div class="user-circle green"></div>
          <span> Represented by a colored circle in the general location where the speed test was performed</span>
        </div>
      </div>
      <div>
        <h3>Base Comparison Speeds</h3>
        <div class="row-fluid">
          <div class="color-gradient"></div>
          <div class="row gradient-values">
            <span>&lt 5 mbps</span>
            <span> 5 - 100 mbps</span>
            <span>&gt 100 mbps</span>
          </div>
          <small>Data Source: <a target="_blank" rel="noopener noreferrer"
              href="https://publicservice.vermont.gov/content/broadband-availability">
              Vermont Dept of Public Service (2019)
            </a></small>
    
    
          <br />
          <p>
            To see the legend and the various map layers, click on the double arrow in the top left corner
            of the map and then click on the right arrow next to the "Percent Broadband" layer. To view
            the "Underserved" layer, turn off the Percent Broadband layer and you'll see the Underserved
            percentage.
          </p>
    
          <p>Click on County or User data point to see a breakdown of the details.</p>
    
        </div>
      </div>
    </div>
  </div>

  <div id="your-results" class="personal-results-container">
    <h2>Your Past Speed Tests</h2>
    <TestResultsList/>  
  </div>
  
</div>





