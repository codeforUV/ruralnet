/**
 * A class to make using cookies in the front-end easy
 */
class CookieUtility {
    constructor() {
        let rawCookie = document.cookie;
        this._cookies = {};
        rawCookie.split(';').forEach(pair => {
            console.log(pair)
            let key, value;
            [key, value] = pair.split('=');
            console.log(key, value);
            this._cookies[key] = value;
        });
    }
    get allCookies() {
        return this._cookies;
    }
    getValue(cookieKey) {
        return this._cookies[cookieKey];
    }
}

/**
 * RuralTest is a custom wrapper class for LibreSpeed SpeedTest class
 */
class RuralTest {
    static testStates = [
        "not started", 
        "started", 
        "download", 
        "ping and jitter", 
        "upload", 
        "finished", 
        "aborted"];
    static emptyTestJson = {
        date: null,
        time: null,
        userID: null,
        ipAddress: null,
        internetProvider: null,
        uploadSpeed: null,
        downloadSpeed: null,
        ping: null,
        city: null, 
        latitude: null,
        longitude: null
    }
    constructor(componentIds=null) {
        this.s = new Speedtest();
        this.today = new Date();
        this.prepared = false;
        this.inProgress = false;
        this.finished = false;
        this.chunkSize = 100;
        this.testOrder = "P_D";
        if(!componentIds) {
            componentIds = {
                // ids of elements that that speedtest wents to write information to
                result: 'result',
                title: 'title',
                done: 'done',
                log: 'log', 
                testBtn: 'test', 
                cancelBtn: 'cancel'
            };
        }
        this.components = {};
        Object.keys(componentIds).forEach(key => {
            this.components[key] = document.getElementById(componentIds[key]);
        })
        console.log(this.components);
        this.testData = RuralTest.emptyTestJson;
    }
    get state() {
        return {
            prepared: this.prepared,
            finished: this.finished,
            inProgress: this.inProgress,
            stage: testStates[0],
        }
    }
    toggleUpload() {
        // turn off
        if (this.testOrder.endsWith("_U")) {
            this.testOrder = this.testOrder.substring(0, 3);
            return false
        // turn on
        } else {
            this.testOrder += "_U";
            return true;
        }
    }
    async prepare() {
        // get ip, isp, time and location
        this.addLogMsg("Preparing Speedtest...");
        let previousTestReq = await fetch('speedDB/constInfoCache.json');
        let prevTestMeta = await previousTestReq.json();
        if (!prevTestMeta.err) {
            this.addLogMsg("Welcome back! Thanks for testing again");
            this.testData.ipAddress = prevTestMeta.ipAddress;
            this.testData.internetProvider = prevTestMeta.internetProvider;
            this.testData.city = prevTestMeta.city;
            // TODO: include lat/lng in that json
        } else {
            this.addLogMsg("Welcome first time tester!");
            let ipInfoReq = await fetch('id/ipInfo.json');
            let ipInfo = await ipInfoReq.json();
            
            this.addLogMsg("Gathering ISP information...");
            this.testData.ipAddress = ipInfo.ip;
            this.testData.internetProvider = ipInfo.org.split(" ").slice(1).join(" ");
            
            this.addLogMsg("Trying to figure out your location...");
            var ipLatLng = ipInfo.loc.replace(" ", "");
            var browserLatLng = await LocationUtility.browserLocation();
            
            let cityreq, chosenLatLng;
            if (browserLatLng !== "geolocationFailed") {
                this.addLogMsg("Using browser geolocation...");
                cityreq = await fetch("location/city.json?latlng=" + browserLatLng);
                chosenLatLng = browserLatLng;
            } else {
                this.addLogMsg("Using IP geolocation...");
                cityreq = await fetch("location/city.json?latlng=" + ipLatLng);
                chosenLatLng = ipLatLng;
            }
            chosenLatLng = chosenLatLng.split(',');
            this.testData.latitude = parseFloat(chosenLatLng[0]);
            this.testData.longitude = parseFloat(chosenLatLng[1]);
            let cityInfo = await cityreq.json();
            this.testData.city = `${cityInfo.city}, ${cityInfo.state}`;
        }

        this.addLogMsg("Finishing preparations...");
        this.testData.date = this.today.toISOString().split("T")[0];
        this.testData.time = this.today.toISOString().split("T")[1].slice(0, -1);
        this.testData.userID = new CookieUtility().getValue("user");
        // then allow testing
        this.prepared = true;
        console.log(this.testData);
    }
    startTest() {
        if (!this.prepared) {
            this.prepare();
        }
        this.inProgress = true;
        this.addLogMsg("Finalizing Speedtest Configuration");
        this.s.setParameter("garbagePhp_chunkSize", chunkSize);
        this.s.setParameter("test_order", this.testOrder);  // no need for IP check, removed upload test from Heroku deploy because it doesn't work w/ heroku
        this.s.setSelectedServer(SPEEDTEST_SERVERS[0]);  // see template.html for SPEEDTEST_SERVERS - there is only one server
        this.s.onupdate = (data) => { this.onUpdate(data) };
        this.s.onend = (data) => { this.onEnd(data) };
        this.addLogMsg("Starting Speedtest");
        this.s.start();
    }
    abortTest() {
        this.inProgress = false;
        this.s.abort();
    }
    onUpdate(data) {
        console.log("TODO");
    }
    onEnd(data) {
        this.finished = true;

    }
    addLogMsg(msg) {
        let newLog = document.createElement('li');
        newLog.textContent = msg;
        console.log(msg);
        this.components.log.appendChild(newLog);
    }
    toString() {
        return "RuralTest";
    }
}

/**
 * RuralTestResults provides containerization for data generated from a speed test
 */
class RuralTestResult {
    static MILLIDAY = 86400000;
    constructor(jsonContent={}, getLocal=false, saveResults=true) {
        if(getLocal) {
            // get from local storage
            this._content = retrieveTestLocal();
        } else if (jsonContent) {
            // get jsonContent to given json object
            this._content = jsonContent;
        } else {
            this._content = {};
        }
        this._saveResults = saveResults;
    }
    get indentifiers() {
        return {
            ip: this._content.ip,
            user: this._content.user
        };
    }
    set location(locationObj) {
        this._content.city = locationObj.city;
        this._content.latitude = locationObj.latitude;
        this._content.longitude = locationObj.longitude;
    }
    set content(testResult) {
        if(!this._content) {
            this._content = testResult;
        }
    }
    storeTestLocal() {
        storage.setItem('recentTest', JSON.stringify(this._content));
        storage.setItem('recentTestDate', Date.now());
    }
    async postTest() {
        const res = await fetch("speedDB/speedTestCRUD.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this._content)
        });
        if (res.ok) {
            this._content._id = await res.json().entryId;
            if (this._saveResults) {
                this.storeTestLocal();
            }
        }
    }
    toggleLocalResultSaving() {
        this._saveResults = !this._saveResults;
        return this._saveResults;
    }
    static retrieveTestLocal() {
        console.log("TODO");
    }
}

/**
 * LocationUtility provides a wrapper for location-based operations for a given RuralTestResults instance
 */
class LocationUtility {
    constructor(results) {
        this.results = results; // a SpeedTestResults instance
    }
    get location() {
        console.log("TODO");
    }
    set location(userInput) {
        console.log("TODO");
    }
    static browserLocation() {
        let geo = navigator.geolocation;
        return new Promise((resolve, reject) => {
            function successCB(position) {
                resolve(`${position.coords.latitude},${position.coords.longitude}`);
            }
            function errorCB(error) {
                reject("geolocationFailed");
            }
            const options = {
                enableHighAccuracy: true, // removed timeout browsers like Edge are SLOW on geoloaction. 
                maximunAge: 3000  // result must be newer than 5 seconds prior to location request
            }
            try {
                geo.getCurrentPosition(successCB, errorCB, options);
            } catch (error) {
                reject("geolocationFailed");
            }
        });
    }
    updateLocation(newLocation) {
        // given a test ID and newLocation (zip code or city, state)
        // verify that newLocation is valid
        // update the test result in the DB w/ lat + long
        console.log("TODO");
    }
    verifyLocationInput(userLocationStr) {
        // use internal API to verify that the user has entered a valid location
        // return valid/invalid + coords if valid?
        console.log("TODO");
    }
}
