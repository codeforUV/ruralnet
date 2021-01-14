export async function get(req, res, next) {
    // insert action code
    // GET /empty does nothing by design
    console.log("DOING PING TEST");
    // on end of action
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
    })
    res.end(JSON.stringify( {} ))
}

export async function post(req, res, next) {
    // insert action code
    // POST /empty also does nothing but the response header gets some extra info in it
    // on end of action
    console.log("DOING UPLOAD TEST");
    res.writeHead(200, {
        'Content-Type': 'application/json',
        "Pragma": "no-cache",
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0"
    });
    res.end(JSON.stringify({}))
}