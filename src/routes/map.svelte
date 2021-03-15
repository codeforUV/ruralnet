<script>
  import ResultsMap from '../components/ResultsMap.svelte';
</script>

<div>
  <h2>Internet Speed in Vermont</h2>

  <p>
    In the map below, the results of speed tests submitted by users of this site are shown as dots,
    with the color representing measured download speed from <font color="red"
      >red (4 mbps or less)</font
    >
    to
    <font color="darkgreen">green (over 100 mbps)</font>. If you did a speed test from a location in
    Vermont, your data point will show up on the map within 24 hours, so please check back!
  </p>
  <p>
    The shaded color for each town shows the percentage of buildings or homes that have broadband
    (25/3 mbps or higher speeds) from data obtained from the Vermont Dept of Public Service at
    <a target="new" href="https://publicservice.vermont.gov/content/broadband-availability"
      >publicservice.vermont.gov/content/broadband-availability</a
    >. To see the legend and the various map layers, click on the double arrow in the top left
    corner of the map and then click on the right arrow next to the "Percent Broadband" layer. To
    view the "Underserved" layer, turn off the Percent Broadband layer and you'll see the
    Underserved percentage. "Underserved" means less than 4 mbps download speed or no internet. The
    town data was collected in 2019 from the internet service providers as to what download/upload
    speeds they were serving to each address. This is one measure of service but overestimates the
    actual speeds that customers are experiencing.
  </p>
  <p>
    You can see the raw counts and percentages in each category by clicking on the town or point.
    For the data submitted using our speed test, clicking the point will show the download speed,
    the town, the date the test was done, and the company providing internet service.
  </p>
</div>
<ResultsMap />
