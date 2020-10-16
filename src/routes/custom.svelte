<script>


function doSpeedTest () {
    // Date information - date and time
    let today = new Date();  // this will be used to make dates and times in the ouput json

    // Location information - latitude and longitude, town/state/country
    let lat, long;
    try {
        function successCallback (position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
        }

        function errorCallback (message) {
            console.log("There was an error with geolocation " + message);
            lat = null;
            long = null;
        }

        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 10000
        }
        let geo = navigator.geolocation;  // this will prompt a browser pop-up
        geo.getCurrentPosition(successCallback, errorCallback, options);
        
    } catch (error) {
        lat = null;
        long = null;
    }

    // ISP information - ip address and isp name
    let ipAddr, ispName;
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
    }
    getIPinfo();

    // Speed information
    var ul, dl, ping;
    console.log('testing!');
    const s = new Speedtest(); 
    s.setSelectedServer(SPEEDTEST_SERVERS[0]);  // see template.html for SPEEDTEST_SERVERS
    console.log(s._selectedServer);
    // Speedtest has a number of callbacks that can be useful
    s.onupdate = function (data) {
        dl = data.dlStatus;  // it also stores the information we care about as easily accessible attributes
        ul = data.ulStatus;
        ping = data.pingStatus;
        document.getElementById('result').textContent = `Ping: ${ping} ms, Down: ${dl} Mbps, Up: ${ul} Mbps`;
    };
    s.onend = function (aborted) {
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
            isp: ispName
        };
        console.log(finalDataJson);
        // TODO: POST final JSON to a new route that adds a new line to a csv file
        async function postTest () {
            const res = await fetch("custom.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(finalDataJson)
            });
            const success = await res.json();
            document.getElementById("done").style.backgroundColor = success.success ? "green" : "red";
        }
        postTest();
        
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