const storage = window.localStorage;
/**
 * A class to make using cookies in the front-end easy
 */
class CookieUtility {
    constructor() {
        let rawCookie = document.cookie;
        this._cookies = {};
        rawCookie.split(';').forEach(pair => {
            let key, value;
            [key, value] = pair.split('=');
            this._cookies[key] = value;
        });
    }
    get allCookies() {
        return this._cookies;
    }
    getValue(cookieKey) {
        return this._cookies[cookieKey];
    }
    recoverUserCookie() {
        let recentTest = storage.getItem('recentTest');
        if (recentTest) {
            let testJSON = JSON.parse(recentTest);
            document.cookie = `user=${testJSON.userID}; Path=/`;
            return true;
        }
        return false;
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
    constructor(componentIds=null, logs=true) {
        this.s = new Speedtest();
        this.today = new Date();
        this.prepared = false;
        this.inProgress = false;
        this.finished = false;
        this._state = 0;
        this.chunkSize = 100;
        this.testOrder = "P_D";
        this.logging = logs;
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
            stage: RuralTest.testStates[this._state]
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
    toggleLogging() {
        this.logging = !this.logging;
        return this.logging;
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
            this.addLogMsg("(If your browser asks to access your location, please click \"Allow\"");
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
    async startTest() {
        if (!this.prepared) {
            await this.prepare();
        }
        this.inProgress = true;
        this.addLogMsg("Finalizing Speedtest Configuration");
        this.s.setParameter("garbagePhp_chunkSize", this.chunkSize);
        this.s.setParameter("test_order", this.testOrder);  // no need for IP check, removed upload test from Heroku deploy because it doesn't work w/ heroku
        this.s.setSelectedServer(SPEEDTEST_SERVERS[0]);  // see template.html for SPEEDTEST_SERVERS - there is only one server
        this.s.onupdate = (data) => { this.onUpdate(data) };
        this.s.onend = (data) => { this.onEnd(data) };
        this.addLogMsg("Starting Speedtest");
        this.components.title.textContent = "Speedtest in progress";
        this.components.testBtn.disabled = true;
        this.s.start();
    }
    abortTest() {
        this.inProgress = false;
        this.s.abort();
        this.components.cancelBtn.disabled = true;
        this.components.testBtn.disabled = false;
        this.components.title.textContent = 'Speedtest cancelled';
    }
    onUpdate(data) {
        this.testData.downloadSpeed = data.dlStatus;
        this.testData.uploadSpeed = data.ulStatus;
        this.testData.ping = data.pingStatus;
        this._state = data.testState + 1;
        this.components.result.textContent = this.toString();
        this.components.done.textContent = RuralTest.testStates[this.state];
    }
    onEnd(aborted) {
        this.finished = true;
        this.components.done.textContent = 'Finished' + (aborted ? ' - Aborted' : '!');
        if (!aborted) {
            this.components.cancelBtn.disabled = true;
            this.components.title.textContent = 'Speedtest Results';
            this.components.result.innerHTML += `, <a href="https://google.com/maps/search/${this.testData.latitude},${this.testData.longitude}">Location: ${this.testData.city}</a>`;
            let testResults = new RuralTestResult(this.testData);
            testResults.postTest();
        }
    }
    addLogMsg(msg) {
        if (this.logging) {
            let newLog = document.createElement('li');
            newLog.textContent = msg;
            this.components.log.appendChild(newLog);
        }
    }
    toString() {
        return `Ping: ${this.testData.ping} ms, Down: ${this.testData.downloadSpeed || "N/A"} Mbps, Up: ${this.testData.uploadSpeed || "N/A"} Mbps`;
    }
}

/**
 * RuralTestResults provides containerization for data generated from a speed test
 */
class RuralTestResult {
    static MILLIDAY = 86400000;
    static TEST_EXPIRY_DAYS = 7;
    constructor(jsonContent={}, getLocal=false, saveResults=true) {
        if(getLocal) {
            // get from local storage
            this._content = RuralTestResult.retrieveTestLocal();
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
            ip: this._content.ipAddress,
            user: this._content.userID
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
    async postTest(update=false) {
        const res = await fetch("speedDB/speedTestCRUD.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this._content)
        });
        if (res.ok) {
            let respJson = await res.json();
            this._content._id = respJson.entryId;
            console.log(this._content);
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
        let lastTest = storage.getItem('recentTest');
        let testJson = null;
        if (lastTest) {
            let lastTestTime = parseInt(storage.getItem('recentTestDate'));
            if (Date.now() < RuralTestResult.MILLIDAY * RuralTestResult.TEST_EXPIRY_DAYS + lastTestTime) {
                try {
                    testJson = JSON.parse(lastTest);
                } catch (error) {
                    storage.clear();
                }
            } else {
                storage.clear()
            }
        }
        return testJson;
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
        // newLocation can be either a zipcode "12345" or town/state string "Bradford, VT"
        let goodFormat = false;
        try {
            let zip = parseInt(newLocation);
            if (zip < 100000 && newLocation.length === 5) goodFormat = true;
        } catch (error) {
            if (newLocation.split(',').length === 2) {
                goodFormat = true;
                newLocation = newLocation.replaceAll(/\s+/g, "");
            }
        }
        if (goodFormat) {
            let verified = LocationUtility.verifyLocationInput(newLocation);
            if (verified) {
                this.results.location = verified;
                this.results.postTest(update=true);
                return true;
            } else {
                return false;  // user input a good format but had a typo or invalid zip code
            }
        } else {
            return false;  // user did not input a good format
        }
    }
    static async verifyLocationInput(userLocationStr) {
        // use internal API to verify that the user has entered a valid location
        // return valid/invalid + coords if valid?
        let verifyReq = await fetch(`/location/verify.json?location=${userLocationStr}`);
        let verification = await verifyReq.json();
        if (verification.verified) {
            return verification;
        } else {
            return null;
        }
    }
}

/**
 * A wrapper class to make speed test interactions with the DOM cleaner 
 * TODO: migrate pieces from speedtest
 */
class SpeedTestPageInterface {

    onPageLoad() {
        /**
         * load and display prev test results
         */
        let prevResults = new RuralTestResult(getLocal=true);
    }
    onStart() {
        /**
         * disable start button
         * enable abort button
         * change title
         */
    }
    onUpdate() {
        /**
         * update results
         * update stage
         * 
         */
    }
    onAbort() {
        /**
         * update title
         * update buttons
         * update stage
         */
    }
    onEnd() {
        /**
         * update title
         * update buttons
         * update stage
         */
    }
}
