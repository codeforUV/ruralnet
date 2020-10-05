const randomBytes = require('random-bytes');

export async function get(req, res, next) {
    console.log('DOING DOWNLOAD TEST');  // debug line to ensure the speed test was going to the node server
    res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Description': 'File Transfer',
        'Content-Disposition': 'attachement; filename=random.dat',
        'Content-Transfer-Encoding': 'binary',
        'Pragma': 'no-cache',
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0"
    })
    // insert action code
    const requestedSize = (req.query.ckSize || 100);
    let b = await randomBytes(1048576);  // generate 1 Mb of random binary data
    for (let i = 0; i < requestedSize; i++) {
        res.write(b);  // write 1-100 Mb of random data 
    }
    // on end of action
    
    res.end()
}

export async function post(req, res, next) {
    // insert action code

    // on end of action
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    res.end(JSON.stringify( ))
}