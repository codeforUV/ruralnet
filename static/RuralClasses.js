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
    static agree() {
        storage.setItem("cookieConsent", "true");
        let recovery = CookieUtility.recoverUserCookie();
        if (!recovery) {
            CookieUtility.getNewCookie();
        }
    }
    static decline() {
        storage.setItem("cookieConsent", "false");
        storage.setItem("cookiesDeclined", new Date().getTime());
        let expiredDate = new Date();
        expiredDate.setFullYear(expiredDate.getFullYear() - 1);
        document.cookie = "user=null; Path=/; Expires=" + expiredDate.toUTCString();
    }
    static async getNewCookie() {
        await fetch("id/cookieMonster.json");
    }
    static recoverUserCookie() {
        let recentTest = storage.getItem('recentTest');
        if (recentTest !== null && CookieUtility.consentStatus().consented) {
            let testJSON = JSON.parse(recentTest);
            if (testJSON.userID) {
                document.cookie = `user=${testJSON.userID}; Path=/`;
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
    static consentStatus() {
        if (storage.getItem("cookieConsent") === "true") {
            return { consented: true, askAgain: false, explicit: true };
        } else if (storage.getItem("cookieConsent") === "false") {
            return { consented: false, askAgain: false, explicit: true };
        } else {
            return { consented: true, askAgain: true , explicit: false };
        }
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
        if(!componentIds) {
            componentIds = {
                // ids of elements that that speedtest wants to write information to
                result: 'result',
                title: 'title',
                done: 'done',
                log: 'log', 
                testBtn: 'test', 
                cancelBtn: 'cancel'
            };
        }
        this.pageInterface = new SpeedTestPageInterface(componentIds, logs);
        this.pageInterface.onPageLoad();
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
    async prepare() {
        // get ip, isp, time and location
        this.pageInterface.addLogMsg("Preparing Speedtest...");
        let previousTestReq = await fetch('speedDB/userInfo.json');
        let prevTestMeta = await previousTestReq.json();
        if (!prevTestMeta.err) {
            this.pageInterface.addLogMsg("Welcome back! Thanks for testing again");
            this.testData.ipAddress = prevTestMeta.ipAddress;
            this.testData.internetProvider = prevTestMeta.internetProvider;
            this.testData.city = prevTestMeta.city;
            this.testData.latitude = prevTestMeta.latitude;
            this.testData.longitude = prevTestMeta.longitude;
            this.pageInterface.addLogMsg("Metadata copied from last test");
        } else {
            this.pageInterface.addLogMsg("Welcome first time tester!");
            this.pageInterface.addLogMsg("Not your first time? You may not have acepted cookies. "); // TODO
            let ipInfoReq = await fetch('id/ipInfo.json');
            let ipInfo = await ipInfoReq.json();
            
            this.pageInterface.addLogMsg("Gathering ISP information...");
            this.testData.ipAddress = ipInfo.ip;
            this.testData.internetProvider = ipInfo.org.split(" ").slice(1).join(" ");
            
            this.pageInterface.addLogMsg("Trying to figure out your location...");
            this.pageInterface.addLogMsg("(If your browser asks to access your location, please click \"Allow\")");
            var ipLatLng = ipInfo.loc.replace(" ", "");
            var browserLatLng = await LocationUtility.browserLocation();
            
            let cityreq, chosenLatLng;
            if (browserLatLng !== "geolocationFailed") {
                this.pageInterface.addLogMsg("Using browser geolocation...");
                cityreq = await fetch("location/city.json?latlng=" + browserLatLng);
                chosenLatLng = browserLatLng;
            } else {
                this.pageInterface.addLogMsg("Using IP geolocation...");
                cityreq = await fetch("location/city.json?latlng=" + ipLatLng);
                chosenLatLng = ipLatLng;
            }
            chosenLatLng = chosenLatLng.split(',');
            this.testData.latitude = parseFloat(chosenLatLng[0]);
            this.testData.longitude = parseFloat(chosenLatLng[1]);
            let cityInfo = await cityreq.json();
            this.testData.city = `${cityInfo.city}, ${cityInfo.state}`;
        }

        this.pageInterface.addLogMsg("Finishing preparations...");
        this.testData.date = this.today.toISOString().split("T")[0];
        this.testData.time = this.today.toISOString().split("T")[1].slice(0, -1);
        this.testData.userID = new CookieUtility().getValue("user");  // if the user has explicitly declined cookies, this field will not be included
        // then allow testing
        this.prepared = true;
    }
    async startTest() {
        if (this.pageInterface.elements.log.firstChild) {
            this.pageInterface.clearLog();
        }
        if (!this.prepared) {
            await this.prepare();
        }
        this.inProgress = true;
        this.pageInterface.addLogMsg("Finalizing Speedtest Configuration");
        this.s.setParameter("garbagePhp_chunkSize", this.chunkSize);
        this.s.setParameter("test_order", this.testOrder);  // no need for IP check, removed upload test from Heroku deploy because it doesn't work w/ heroku
        this.s.setSelectedServer(SPEEDTEST_SERVERS[0]);  // see template.html for SPEEDTEST_SERVERS - there is only one server
        this.s.onupdate = (data) => { this.onUpdate(data) };
        this.s.onend = (data) => { this.onEnd(data) };
        this.pageInterface.addLogMsg("Starting Speedtest");
        this.pageInterface.onStart();
        this.s.start();
    }
    abortTest() {
        this.inProgress = false;
        this.s.abort();
        this.s = new Speedtest();
        this.pageInterface.onAbort();
    }
    onUpdate(data) {
        this.testData.downloadSpeed = data.dlStatus;
        this.testData.uploadSpeed = data.ulStatus;
        this.testData.ping = data.pingStatus;
        this._state = data.testState + 1;
        this.pageInterface.onUpdate(this.toString(), this._state)
    }
    onEnd(aborted) {
        this.finished = true;
        this.pageInterface.onEnd(aborted, this.testData);
        if (!aborted) {
            let testResults = new RuralTestResult(this.testData);
            testResults.postTest();
        }
    }
    toString() {
        return new RuralTestResult(this.testData).toString();
    }
    getResult() {
        return new RuralTestResult(this.testData);
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
        this._content.latitude = locationObj.latlng.lat;
        this._content.longitude = locationObj.latlng.lng;
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
        const res = await fetch("speedDB/speedDB.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this._content)
        });
        if (res.ok) {
            let respJson = await res.json();
            this._content._id = respJson.entryId;
            if (this._saveResults && !update) {
                this.storeTestLocal();
            }
            return true;
        }
        return false;
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
    toString() {
        return `Ping: ${this._content.ping} ms, Down: ${this._content.downloadSpeed || "N/A"} Mbps, Up: ${this._content.uploadSpeed || "N/A"} Mbps`;
    }
    metaDataString() {
        return `${this._content.internetProvider}, ${this._content.city} on ${new Date(`${this._content.date}T${this._content.time}Z`)}`;
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
    async updateLocation(newLocation) {
        // given a test ID and newLocation (zip code or city, state)
        // verify that newLocation is valid
        // update the test result in the DB w/ lat + long
        // newLocation can be either a zipcode "12345" or town/state string "Bradford, VT"
        let goodFormat = false;
        let zip = parseInt(newLocation);
        if (zip < 100000 && newLocation.length === 5) {
            goodFormat = true;
        } else if (newLocation.split(',').length === 2) {
            goodFormat = true;
            newLocation = newLocation.replaceAll(/\s+/g, "").toLowerCase();
        } 
        if (goodFormat) {
            let verified = await LocationUtility.verifyLocationInput(newLocation);
            if (verified.verified) {
                this.results.location = verified;
                this.results.postTest(true);
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
            console.log("Verified!");
            console.log(verification);
            return verification;
        } else {
            console.log("Not Verified!");
            console.log(verification);
            return null;
        }
    }
}

/**
 * A wrapper class to make speed test interactions with the DOM cleaner 
 * TODO: migrate pieces from speedtest
 */
class SpeedTestPageInterface {
    constructor(elementIds, log = true){
        this.elements = {};
        Object.keys(elementIds).forEach(key => {
            this.elements[key] = document.getElementById(elementIds[key]);
        })
        this.lastState = "not started";
        this.logging = true;
    }
    onPageLoad() {
        let prevResults = new RuralTestResult({}, true);
        if (prevResults._content && CookieUtility.consentStatus().consented) {
            this.elements.result.textContent = "Previous Results: " + prevResults.toString();
            this.elements.done.textContent = `Last test taken on ${new Date(`${prevResults._content.date}T${prevResults._content.time}Z`)}`;    
        }
    }
    onStart() {
        this.elements.title.textContent = "Speedtest in progress";
        this.elements.testBtn.disabled = true;
        this.elements.cancelBtn.disabled = false;
    }
    onUpdate(resultProgress, stateIndex) {
        let presentState = RuralTest.testStates[stateIndex];
        if (presentState !== this.lastState) {
            this.addLogMsg(`Test ${presentState}...`);
            this.lastState = presentState;
            this.elements.done.textContent = presentState;
        }
        this.elements.result.textContent = resultProgress;
        
    }
    onAbort() {
        this.addLogMsg("Test Aborted by user");
        this.elements.cancelBtn.disabled = true;
        this.elements.testBtn.disabled = false;
        this.elements.title.textContent = 'Speedtest cancelled';
    }
    onEnd(aborted, data) {
        this.elements.done.textContent = 'Finished' + (aborted ? ' - Aborted' : '!');
        this.elements.testBtn.textContent = 'Click to test again';
        if (!aborted) {
            this.addLogMsg("Test Complete!")
            this.elements.cancelBtn.disabled = true;
            this.elements.testBtn.disabled = false;
            this.elements.title.textContent = 'Speedtest Results';
            this.elements.result.innerHTML += `, <a href="https://google.com/maps/search/${data.latitude},${data.longitude}">Location: ${data.city}</a>`;
        }
    }
    toggleLogging() {
        this.logging = !this.logging;
        return this.logging;
    }
    addLogMsg(msg) {
        if (this.logging) {
            let newLog = document.createElement('li');
            newLog.textContent = msg;
            this.elements.log.appendChild(newLog);
        }
    }
    clearLog() {
        while (this.elements.log.firstChild) {
            this.elements.log.removeChild(this.elements.log.firstChild);
        }
    }
}
