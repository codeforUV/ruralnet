<script>
function doSpeedTest () {
    console.log('testing!');
    const s = new Speedtest(); // might require servers to be passed in
    s.setSelectedServer(SPEEDTEST_SERVERS[0]);
    console.log(s._selectedServer);
    s.onupdate = function (data) {
        let dl = data.dlStatus;
        let ul = data.ulStatus;
        let ping = data.pingStatus;
        document.getElementById('result').textContent = `Ping: ${ping} ms, Down: ${dl} Mbps, Up: ${ul} Mbps`;
    };
    s.onend = function (aborted) {
        document.getElementById('done').textContent = 'Finished!' + (aborted ? ' - Aborted' : ''); 
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