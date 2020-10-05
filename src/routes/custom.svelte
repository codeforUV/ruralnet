<script>
function doSpeedTest () {
    console.log('testing!');
    const s = new Speedtest(); 
    s.setSelectedServer(SPEEDTEST_SERVERS[0]);  // see template.html for SPEEDTEST_SERVERS
    console.log(s._selectedServer);
    // Speedtest has a number of callbacks that can be useful
    s.onupdate = function (data) {
        let dl = data.dlStatus;  // it also stores the information we care about as easily accessible attributes
        let ul = data.ulStatus;
        let ping = data.pingStatus;
        document.getElementById('result').textContent = `Ping: ${ping} ms, Down: ${dl} Mbps, Up: ${ul} Mbps`;
    };
    s.onend = function (aborted) {
        document.getElementById('done').textContent = 'Finished!' + (aborted ? ' - Aborted' : ''); 
        // this would be a great place to collect up and down speeds, bundle with GIS info and POST to a server
    }
    s.start();
};
</script>

<svelte:head>
  <title>Custom Speed Test</title>
</svelte:head>

<button id='test' on:click={doSpeedTest}>Click to Test</button>
<p id='result'></p>
<p id='done'></p>