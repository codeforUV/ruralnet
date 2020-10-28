<script>
    var lat, long, ispName, ipAddr, today, ul, dl, ping, chunkSize, userLocation, testId;
    chunkSize = 100;  // speedtest default
    const saveResults = true;
    var finished = false;
    async function getIPinfo () {
        // first try seeing if this IP has done a speed test before
        try {
            let req = await fetch("/ipCache.json");
            let ipInfo = await req.json()
            if (req.ok) {  // both values returned on ok
                ipAddr = ipInfo.ipAddress;
                ispName = ipInfo.internetProvider;
                console.log("got ip from database")
            } else {  // only ip address returned on error
                ipAddr = ipInfo.ipAddress;
            }
        } catch {
            console.log("problem with ipCache")
        }
        // if not, then use ipinfo.io
        if (!ipAddr || !ispName) {
            try {
                // TODO: check if ip is in database already, only make req if not bc rate limit on non-auth requests
                let req = await fetch("https://ipinfo.io/json");
                let ipInfo = await req.json();
                ipAddr = ipAddr || ipInfo.ip;
                ispName = ipInfo.org;
                console.log("got ip from ipinfo.io")
            } catch (error) {
                ispName = null;
            }
        }
        
    };
    function getBrowserLocation (accuracy) {
        let geo = navigator.geolocation;  // geolocation gets more accurate over time once enabled??? so by placing this line ahead of geo.getCurrentPosition buys time (milliseconds) for the browser to be accurate
        return new Promise((resolve, reject) => {
            function successCallback(position) {
                let pos = position.coords;
                if (pos.accuracy < accuracy) {
                    resolve(pos);
                } else {
                    console.log("bad accuracy", pos.accuracy, "meters");
                    resolve(pos);  
                }
            }
            function errorCallback(error) {
                reject(error.message);
            }
            const options = {
                enableHighAccuracy: true, // removed timeout browsers like Edge are SLOW on geoloaction. 
                maximunAge: 3000  // result must be newer than 5 seconds prior to location request
            }
            try {
                geo.getCurrentPosition(successCallback, errorCallback, options);
            } catch (error) {
                reject(error);
            }
            
        })
    };
    async function postTestResults (results) {
        // pass in a results json object to be posted to the server
        const res = await fetch("speedDatabase.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(results)
        });
        /*
        
        document.getElementById("done").style.backgroundColor = success.success ? "green" : "red";
        */
       if (res.ok) {
            const success = await res.json();
            testId = success.entryId;
       }
    };
    function speedtestUpdate (data) {
        // data stores multiple useful attributes related to the test underway
        dl = data.dlStatus;  
        ul = data.ulStatus;
        ping = data.pingStatus;
        document.getElementById('result').innerHTML = `Ping: ${ping} ms, Down: ${dl} Mbps, Up: ${ul} Mbps`;
        document.getElementById('done').textContent = `${["not started", "started", "download", "ping and jitter", "upload", "finished", "aborted"][data.testState + 1]}`;
    };
    async function speedtestEnd (aborted) {
        // TODO: handle aborted test (Also TODO: enable test abortion)
        document.getElementById('done').textContent = 'Finished!' + (aborted ? ' - Aborted' : ''); 
        // convert coords to city
        let cityLocation = null;
        if (lat && long){
            let cityreq = await fetch(`/location/city.json?latlng=${lat},${long}`);
            let cityJson = await cityreq.json();
            cityLocation = `${cityJson.city}, ${cityJson.state}`;
            document.getElementById('result').innerHTML += `, <a href="https://google.com/maps/search/${lat},${long}">Location: ${cityLocation}</a>`;
        } else {
            document.getElementById('result').innerHTML += ", Location Unknown";
        }
        if (ispName) {
            ispName = ispName.split(" ").slice(1).join(" "); // ispName is always "ASxyz123 Company Name", so throw away the first word
        }
        let finalDataJson = {
            date: today.toISOString().split("T")[0],
            time: today.toISOString().split("T")[1].slice(0, -1),  // not correct timezone time...
            ipAddress: ipAddr,
            uploadSpeed: ul,
            downloadSpeed: dl,
            ping: ping,
            city: cityLocation, 
            latitude: lat,
            longitude: long,
            internetProvider: ispName  
            //chunkSize: chunkSize  // this is good for testing but can be discarded later
        };
        console.log(finalDataJson);
        // POST final JSON to a new route that adds a new line to a csv file
        if (saveResults) {
            postTestResults(finalDataJson);
        }
        finished = true;
    };

    async function doSpeedTest () {
        let r = document.getElementById("result");
        // Date information - date and time
        today = new Date();

        // Location information - latitude and longitude, town/state/country
        r.innerHTML = "Getting location...";
        try {
            let browserLocation = await getBrowserLocation(500);
            if (typeof browserLocation !== "string") {
                lat = browserLocation.latitude;
                long = browserLocation.longitude;
            } else {
                throw new Error("Browser Location Didn't Work");
            }
        } catch (error) {
            lat = null;
            long = null;
        }
        // ISP information - ip address and isp name
        r.innerHTML = "getting ISP information...";
        await getIPinfo();

        // Speed information
        r.innerHTML = "Beginning speedtest...";
        const s = new Speedtest(); 
        if (typeof chunkSize === "number") {
            console.log(chunkSize);
            s.setParameter("garbagePhp_chunkSize", chunkSize);
        } else {
            chunkSize = 100;
        }
        s.setParameter("test_order","P_D");  // no need for IP check, removed upload test from Heroku deploy because it doesn't work w/ heroku
        s.setSelectedServer(SPEEDTEST_SERVERS[0]);  // see template.html for SPEEDTEST_SERVERS - there is only one server
        console.log('testing!\n', s._selectedServer);
        // Speedtest has a number of callbacks that can be useful
        s.onupdate = speedtestUpdate;
        s.onend = speedtestEnd;
        s.start();
        document.getElementById("test").disabled = true;
        // NOTE: we could promisify the speedtest to make running sequential tests possible (obvious statements are obvious but hey)
    };
    async function fixLocation () {
        // pre-request screening - 5 digit zip code or properly comma'd string
        let good = false;
        try {
            let n = parseInt(userLocation);
            if (n < 100000) good = true;
        } catch (error) {
            console.log("not a zip code")
        }
        if (! good) {
            if (userLocation.split(',').length === 2) {
                good = true;
                userLocation = userLocation.replace(/\s+/g, "");  // strip whitespace -> town,ST
            }
        }
        // passed pre request screening, verify with server
        if (good) {
            let verifyReq = await fetch(`/location/verify.json?location=${userLocation}`);
            let verification = await verifyReq.json();
            if (verification.verified) {
                let update = {  // update keys need to match schema
                    _id: testId,
                    city: verification.city,
                    latitude: verification.latlng.lat,
                    longitude: verification.latlng.lng
                }
                let updateReq = await fetch("/speedDatabase.json", { // speedDatabase upgraded to handle updates through POST, given known ID
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(update)
                });
                // this is a debugging line - delete it later
                document.getElementById("chastise").innerText = `verified ${update.city} @ ${update.latitude}, ${update.longitude} for test #${update._id}`;
            } else {
                // if not verified, then user gave garbage. advise to retry
                document.getElementById("chastise").innerText = "Not a real town or zip code, check spelling and try again";
            }

        } else {
            document.getElementById("chastise").innerText = "please separate town + state with a comma, or enter a valid 5-digit zip code";
        }
    }
</script>

<svelte:head>
  <title>Speed Test</title>
</svelte:head>

<h1>Take a Speed Test</h1>
<button id='test' on:click={doSpeedTest}>Click to Test</button>
<p id='result'></p>
<p id='done'></p>
{#if finished}
    <h2>Location Look Wrong?</h2>
    <p><small>Location estimation works best on mobile devices</small></p>
    <p><strong>Tell us where you are - city, state or zip code</strong></p>
    <input type="text" bind:value={userLocation} placeholder="example: Barre, VT">
    <button on:click={fixLocation}>That's where I am</button>
    <p id="chastise"></p>
{/if}
