import { getRequestIP } from '../../helpers';
const crypto = require('crypto');

function assignCookie(req) {
    // use date + ip to create a unique pair that can be hashed into a unique SHA
    if(req.headers.cookie) {
        console.log('HAS COOKIE!');
        console.log(req.headers.cookie);
        return req.headers.cookie.split('=')[1];
        // TODO: search specifically for the user cookie
    }
    else {
        console.log("NEW COOKIE");
        let reqIP = getRequestIP(req);
        let date = String(new Date().getTime());
        let size = Math.floor(date.length / 3);
        // interleave IP address and date (represented in seconds since 1969) for an almost certain to be unique number
        [0, 1, 2].forEach(position => {
            reqIP = reqIP.replace('.', date.substring(position * size, (position + 1) * size ));
        })
        reqIP += date.substring(3 * size);
        // Hash it - even though it's already probably unique, let's use SHA-256 to be safe
        let hash = crypto.createHash('sha256');
        hash.update(reqIP);
        let newCookie = hash.digest('hex');
        console.log(newCookie);
        return newCookie;
    }
    
}

// this route gets called automatically to assign a user a cookie id to identify their device
export async function get(req, res, next) {
    
    let cookieID = assignCookie(req);

    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Set-Cookie': `user=${cookieID}; Path=/` // by setting Path=/, the cookie will be sent to all routes in the ruralnet website
    });
    res.end(JSON.stringify({ cookie: "yum" }))
}

/**
 * cookies require disclaimers
 * something simple like:
 * "RuralNet uses cookies to provide you with a better experience"
 * "RuralNet does not share our cookies with outside sources"
 * "RuralNet will not track you outside of the RuralNet website"
 */