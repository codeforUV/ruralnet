const fs = require('fs')
export function get (req, res, next) {
    res.writeHead(200, {
        'Content-type': 'application/json'
    });
    res.end(JSON.stringify({success: true}));
}

export function post (req, res, next) {
    try {
        console.log(req.body);
        const data = req.body; //JSON.parse(req.body);
        let allTestData;
        fs.readFile("tests.json", (err, data) => {
            if (err) throw err;
            allTestData = JSON.parse(data);
        });
        allTestData.push(data);
        fs.writeFile("tests.json", JSON.stringify(allTestData), (err) => {
            if (err) throw err;
            console.log(updated);
        })
        /* let writeString = `${data.date},${data.time},`;
        writeString += `${data.uploadSpeed},${data.uploadSpeed},${data.ping},`;
        writeString += `${data.ip},${data.isp},`;
        writeString += `${data.city},${data.latitude},${data.longitude}\n`; */
        fs.appendFile("tests.csv", writeString, (err) => {
            if (err) throw err;
            console.log("append done");
        });
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(JSON.stringify({success: true}));
    } catch (error) {
        console.log(error);
        res.writeHead(500, {
            'Content-type': 'application/json'
        });
        res.end(JSON.stringify({success: false}));
    }
    
}