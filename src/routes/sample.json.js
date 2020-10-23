import { json } from "body-parser";

const randomBytes = require('random-bytes');
/*
this file exists to test file creation with random bytes
*/
export async function get(req, res, next) {
    res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Description': 'File Transfer',
        'Content-Disposition': 'attachement; filename=random.dat',
        'Content-Transfer-Encoding': 'binary',
        'Pragma': 'no-cache',
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0"
    })
    let b = await randomBytes(1048576);
    res.write(b);
    res.end();
    /*
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    res.write(JSON.stringify({"success": 'Yes!'}));
    res.end();
    */
}
