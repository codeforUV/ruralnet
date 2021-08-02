<script>
  import ResultsMap from '../components/ResultsMap.svelte';

</script>

<h1>Results Map</h1>

<ResultsMap />

<!-- <p>
    In the map below, the results of speed tests submitted by users of this site are shown as dots,
    with the color representing measured download speed from <font color="red"
      >red (4 mbps or less)</font
    >
    to
    <font color="darkgreen">green (over 100 mbps)</font>. If you did a speed test from a location in
    Vermont, your data point will show up on the map within 24 hours, so please check back!
  </p> -->
<div class="container-fluid">
  <h3>User Submitted Speeds</h3>
  <div class="legend">
    <div class="legend-user">
      <div class="user-circle green" />
      <!-- <span>&gt 100 mbps</span> -->
      <span
        >Represented by a colored circle in the general location where the speed test was performed</span
      >
    </div>
  </div>

  <div>
    <h3>Base Comparison Speeds</h3>

    <div class="row-fluid">
      <div class="color-gradient" />
      <div class="row gradient-values">
        <span>&lt 5 mbps</span>
        <span> 5 - 100 mbps</span>
        <span>&gt 100 mbps</span>
      </div>
      <small
        >Data Source: <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://publicservice.vermont.gov/content/broadband-availability"
          >Vermont Dept of Public Service (2019)</a
        ></small
      >
    </div>
    <!-- <p>
        The shaded color for each town shows the percentage of buildings or homes that have broadband
        (25/3 mbps or higher speeds) from data obtained from the Vermont Dept of Public Service at
        <a target="new" href="https://publicservice.vermont.gov/content/broadband-availability">publicservice.vermont.gov/content/broadband-availability</a>. 
      </p> -->
    <br />
    <p>
      To see the legend and the various map layers, click on the double arrow in the top left corner
      of the map and then click on the right arrow next to the "Percent Broadband" layer. To view
      the "Underserved" layer, turn off the Percent Broadband layer and you'll see the Underserved
      percentage.
    </p>
    <!-- <p>
        "Underserved" means less than 4 mbps download speed or no internet. The
        town data was collected in 2019 from the internet service providers as to what download/upload
        speeds they were serving to each address. This is one measure of service but overestimates the
        actual speeds that customers are experiencing.
      </p> -->
    <p>Click on County or User data point to see a breakdown of the details.</p>
    <!-- <p>
        You can see the raw counts and percentages in each category by clicking on the town or point.
        For the data submitted using our speed test, clicking the point will show the download speed,
        the town, the date the test was done, and the company providing internet service.
      </p> -->
  </div>
</div>
<!-- </div> -->

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

</style>
<<<<<<< HEAD

<svelte:head>
  <title>Results Map</title>
</svelte:head>

  <h1>Results Map</h1>

  <ResultsMap />

  <!-- <p>
    In the map below, the results of speed tests submitted by users of this site are shown as dots,
    with the color representing measured download speed from <font color="red"
      >red (4 mbps or less)</font
    >
    to
    <font color="darkgreen">green (over 100 mbps)</font>. If you did a speed test from a location in
    Vermont, your data point will show up on the map within 24 hours, so please check back!
  </p> -->
  <div class="container-fluid">
    <h3>User Submitted Speeds</h3>
    <div class="legend">
  
        <div class="legend-user">
          <div class="user-circle green"></div>
          <!-- <span>&gt 100 mbps</span> -->
          <span>Represented by a colored circle in the general location where the speed test was performed</span>
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
        <small>Data Source: <a target="_blank" rel='noopener noreferrer' href="https://publicservice.vermont.gov/content/broadband-availability">Vermont Dept of Public Service (2019)</a></small>
      </div>
      <!-- <p>
        The shaded color for each town shows the percentage of buildings or homes that have broadband
        (25/3 mbps or higher speeds) from data obtained from the Vermont Dept of Public Service at
        <a target="new" href="https://publicservice.vermont.gov/content/broadband-availability">publicservice.vermont.gov/content/broadband-availability</a>. 
      </p> -->
      <br/>
      <p>
        To see the legend and the various map layers, click on the double arrow in the top left
        corner of the map and then click on the right arrow next to the "Percent Broadband" layer. To
        view the "Underserved" layer, turn off the Percent Broadband layer and you'll see the
        Underserved percentage. 
      </p>
      <!-- <p>
        "Underserved" means less than 4 mbps download speed or no internet. The
        town data was collected in 2019 from the internet service providers as to what download/upload
        speeds they were serving to each address. This is one measure of service but overestimates the
        actual speeds that customers are experiencing.
      </p> -->
      <p>
        Click on County or User data point to see a breakdown of the details.
      </p>
      <!-- <p>
        You can see the raw counts and percentages in each category by clicking on the town or point.
        For the data submitted using our speed test, clicking the point will show the download speed,
        the town, the date the test was done, and the company providing internet service.
      </p> -->
    </div>


</div>
<!-- </div> -->
=======
>>>>>>> 6501e4ed1c0adc708ada64c402aed25d47fbc712
