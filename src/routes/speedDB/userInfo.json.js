import { SpeedTest } from '../../models';
import { getRequestIP, getUserCookie } from '../../helpers';

// this route uses ip address as a key to get info from previous tests, sparing api calls
export async function get (req, res, next) {
    let requestIP = getRequestIP(req);
    if (process.env.DEV) {
        requestIP = "199.21.137.7";
    }
    let userID = getUserCookie(req);
    console.log(`IP:USER: ${requestIP} | ${userID}`);
    const prevTest = await SpeedTest.findOne({ ipAddress: requestIP, userID: userID });
    if (prevTest) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ ipAddress: requestIP, 
            internetProvider: prevTest.internetProvider, 
            city: prevTest.city, 
            latitude: prevTest.latitude,
            longitude: prevTest.longitude,
            cookie: prevTest.userID || "no userID", 
            err: null}));  // include ip, ISP, and city string (which can be used to obtain lat/long later)
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ ipAddress: requestIP, uniqueID: userID, err: "no tests from this IP address + user are stored in the database"}))
    }
}