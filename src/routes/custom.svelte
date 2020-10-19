<script>
    var lat, long, ispName, ipAddr, today, ul, dl, ping, ckSize;
    var finished = false;
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 10000
    };
    function successCallback (position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
    };
    function errorCallback (message) {
        console.log("There was an error with geolocation " + message);
        lat = null;
        long = null;
    };
    async function getIPinfo () {
        try {
            let req = await fetch("https://ipinfo.io/json");
            let ipInfo = await req.json();
            ipAddr = ipInfo.ip;
            ispName = ipInfo.org;
        } catch (error) {
            ipAddr = null;
            ispName = null;
        }
    };
    async function postTestResults (results) {
        const res = await fetch("custom.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(results)
        });
        const success = await res.json();
        document.getElementById("done").style.backgroundColor = success.success ? "green" : "red";
    };
    function speedtestUpdate (data) {
        dl = data.dlStatus;  // it also stores the information we care about as easily accessible attributes
        ul = data.ulStatus;
        ping = data.pingStatus;
        document.getElementById('result').textContent = `Ping: ${ping} ms, Down: ${dl} Mbps, Up: ${ul} Mbps`;
    };
    function speedtestEnd (aborted) {
        document.getElementById('done').textContent = 'Finished!' + (aborted ? ' - Aborted' : ''); 
        // this would be a great place to collect up and down speeds, bundle with GIS info and POST to a server
        let finalDataJson = {
            date: `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`,
            time: `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()}`,
            ip: ipAddr,
            uploadSpeed: ul,
            downloadSpeed: dl,
            ping: ping,
            city: null,
            latitude: lat,
            longitude: long,
            isp: ispName,
            chunkSize: ckSize
        };
        console.log(finalDataJson);
        // POST final JSON to a new route that adds a new line to a csv file
        postTestResults(finalDataJson);
        finished = true;
    };

    function doSpeedTest (chunkSize) {
        // Date information - date and time
        today = new Date();

        // Location information - latitude and longitude, town/state/country
        try {
            let geo = navigator.geolocation;  // this will prompt a browser pop-up
            geo.getCurrentPosition(successCallback, errorCallback, options);
        } catch (error) {
            lat = null;
            long = null;
        }
        // ISP information - ip address and isp name
        getIPinfo();

        // Speed information
        const s = new Speedtest(); 
        if (typeof chunkSize === "number") {
            console.log(chunkSize);
            s.setParameter("garbagePhp_chunkSize", chunkSize);
        } else {
            chunkSize = 100;
        }
        ckSize = chunkSize;
        s.setSelectedServer(SPEEDTEST_SERVERS[0]);  // see template.html for SPEEDTEST_SERVERS
        console.log('testing!\n', s._selectedServer);
        // Speedtest has a number of callbacks that can be useful
        s.onupdate = speedtestUpdate;
        s.onend = speedtestEnd;
        s.start();
    };
    function retestSpeedtest() {
        // the general idea here was to run two extra speed tests with different chunk sizes if the user was unhappy with their first test
        // but the speed test is asynchronous and not a promise, so sequential code like this doesn't really "work"
        // hence why the half size test is commented out, otherwise they run concurrently
        let ulSpeeds = [ul];
        let dlSpeeds = [dl];
        let pings = [ping];
        //document.getElementById("done").textContent = "retesting 1";
        /* doSpeedTest(50);  // cut chunk size in half
        ulSpeeds.push(ul);
        dlSpeeds.push(dl);
        pings.push(ping); */
        document.getElementById("done").textContent = "retesting 2";
        doSpeedTest(200);  // double chunk size
        ulSpeeds.push(ul);
        dlSpeeds.push(dl);
        pings.push(ping);
        console.log(ulSpeeds, dlSpeeds, pings);  // TODO: remove later
    };
</script>

<svelte:head>
  <title>Custom Speed Test</title>
</svelte:head>

<button id='test' on:click={doSpeedTest}>Click to Test</button>
<p id='result'></p>
<p id='done'></p>
{#if finished}
    <label for="retest">Test again with double data transfer</label>
    <button id="retest" on:click={retestSpeedtest}>Click to Retest</button>
{/if}