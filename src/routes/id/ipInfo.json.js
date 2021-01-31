import fetch from 'node-fetch';
import { getRequestIP } from '../../helpers';

// this endpoint can be called from the frontend to relay a request to ipinfo.io for the end user
export async function get (req, res, next) {
    var reqIP = getRequestIP(req);
    if (process.env.DEV) {
        reqIP = "199.21.137.7";
    }
    try {
        let ipInfoReq = await fetch(`https://ipinfo.io/${reqIP}?token=${process.env.IPINFO_TOKEN}`);
        let ipInfo = await ipInfoReq.json();
    
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(ipInfo));
    } catch (error) {
        res.writeHead(500, {
            'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ ipAddress: reqIP, err: "Probably exceeded ipinfo.io rate limit"}));
    }
    
}