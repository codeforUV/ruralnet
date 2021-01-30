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

// /**
//  * RuralTest is a custom wrapper class for LibreSpeed SpeedTest class
//  */
// class RuralTest {
//     constructor() {
//         this.s = new Speedtest();
//         this.inProgress = false;
//         this.finished = false;

//     }
//     // static testStates = [
//     //     "not started", 
//     //     "started", 
//     //     "download", 
//     //     "ping and jitter", 
//     //     "upload", 
//     //     "finished", 
//     //     "aborted"];
//     get state() {
//         return {
//             finished: this.finished,
//             inProgress: this.inProgress,
//             stage: testStates[0],
//         }
//     }
//     startTest() {
//         this.inProgress = true;
//         this.s.start();
//     }
//     abortTest() {
//         this.inProgress = false;
//         this.s.abort();
//     }
//     onUpdate() {
//         continue;
//     }
//     onEnd() {
//         this.finished = true;

//     }
//     toString() {
//         continue;
//     }
// }

// /**
//  * RuralTestResults provides containerization for data generated from a speed test
//  */
// class RuralTestResult {
//     static MILLIDAY = 86400000;
//     constructor(jsonContent={}, getLocal=false, saveResults=true) {
//         if(getLocal) {
//             // get from local storage
//             this._content = retrieveTest();
//         } else if (jsonContent) {
//             // get jsonContent to given json object
//             this._content = jsonContent;
//         } else {
//             this._content = {};
//         }
//         this._saveResults = saveResults;
//     }
//     get indentifiers() {
//         return {
//             ip: this._content.ip,
//             user: this._content.user
//         };
//     }
//     set location(locationObj) {
//         this._content.city = locationObj.city;
//         this._content.latitude = location.latitude;
//         this._content.longitude = location.longitude;
//     }
//     set content(testResult) {
//         if(!this._content) {
//             this._content = testResult;
//         }
//     }
//     storeTestLocal() {
//         continue;
//     }
//     async postTest() {

//     }
//     toggleLocalResultSaving() {
//         this._saveResults = !this._saveResults;
//         return this._saveResults;
//     }
//     static retrieveTestLocal() {
//         continue;
//     }
// }

// /**
//  * LocationUtility provides a wrapper for location-based operations for a given RuralTestResults instance
//  */
// class LocationUtility {
//     constructor(results) {
//         this.results = results;
//     }
//     browserLocation() {
//         // first, check db if ip + user cookie yields a location
//         // if not, use browser api to get location
//         continue;
//     }
//     updateLocation(testId, newLocation) {
//         // given a test ID and newLocation (zip code or city, state)
//         // verify that newLocation is valid
//         // update the test result in the DB w/ lat + long
//         continue;
//     }
//     verifyLocationInput(userLocationStr) {
//         // use internal API to verify that the user has entered a valid location
//         // return valid/invalid + coords if valid?
//         continue;
//     }
// }
