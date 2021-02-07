import { SpeedTest } from '../../models';
import { getRequestIP, getUserCookie } from '../../helpers';

// this route uses ip address as a key to get info from previous tests, sparing api calls
export async function get (req, res, next) {
    let requestIP = getRequestIP(req);
    if (process.env.DEV) {
        requestIP = "199.21.137.7";
    }
    let userID = getUserCookie(req);
    const prevTests = await SpeedTest.find({ ipAddress: requestIP, userID: userID });
    if (prevTests) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ docs: prevTests }));  // perhaps filter what's included in prevTests
    } else {
        res.writeHead(500, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ ipAddress: requestIP, err: "no tests from this IP address stored in the database"}))
    }
}