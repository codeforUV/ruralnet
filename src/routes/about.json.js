import getSpeed from 'fast-speed-test';
import speedTest from 'speedtest-net';
import cliProgress from 'cli-progress';

let bar;
let progress = 0;
const bytesToMegabits = (bytes) => bytes / 125000;
let array = [];

const logSpeed = (e) => { 
   if (e.type === 'download' || e.type === 'upload') {
     // bar.update(parseInt(e.progress * 100));
        if (progress + 10 <= parseInt(e.progress * 100)) {
            progress = parseInt(e.progress * 100);
            console.log(progress);
        }
        
    } else if (e.type === 'config' || e.type === 'testStart') {
        console.log(e);
    }
}
const options = {
    'acceptLicense': true,
    'acceptGdpr': true,
    'verbosity': 2,
    'progress': logSpeed
}

export async function get(req, res, next) {
    bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    
    //options.sourceIp = req.query.ip;  // source Ip specifies a local Ip device, e.g. 192.168.1.1 ...
    //options.serverIp = req.query.ip;  // this does nothing. 
    //console.log(req);              // req is a super useful object with some great attributes, but query is the best because it lets you get request parameters by name
    //console.log(options);
    bar.start(100, 0);
    // let speed = await getSpeed(10);
    let speed = await speedTest(options);
    console.log(speed);
    // let respString = `${speed} bytes per second`;
    let download = bytesToMegabits(speed.download.bandwidth);
    let upload = bytesToMegabits(speed.upload.bandwidth);
    let respString = `Download: ${download} Mbps\nUpload: ${upload} Mbps`;
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({ speed: respString }));
}
export function post(req, res, next) {
    const { clientForm } = req.body;
    console.log(`post on server: ${clientForm}`);
    res.writeHead(200, {
        'Content-type': 'application/json'
    });
    res.end(JSON.stringify(clientForm))
}
