const randomBytes = require('random-bytes');

var cache = null;

export async function get(req, res, next) {
    console.log(`DOING DOWNLOAD TEST ${req.query.ckSize}`);  // debug line to ensure the speed test was going to the node server
    res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Description': 'File Transfer',
        'Content-Disposition': 'attachment; filename=random.dat',
        'Content-Transfer-Encoding': 'binary',
        'Pragma': 'no-cache',
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0"
    })
    const requestedSize = (req.query.ckSize || 100);
    let b;
    if (!cache) {
        b = await randomBytes(1048576);  // generate about 1 MB of random binary data
        cache = b;
    } else {
        b = cache;
    }
    
    for (let i = 0; i < requestedSize; i++) {
        res.write(b);  // write 1 MB of random data for each loop, up to requestedSize 
    }
    
    res.end()
}

export async function post(req, res, next) {
    // do nothing
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    res.end(JSON.stringify( ))
}