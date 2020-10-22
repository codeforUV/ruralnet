// import getSpeed from 'fast-speed-test';
import speedTest from 'speedtest-net';
import cliProgress from 'cli-progress';

let bar;
let progress;
const bytesToMegabits = (bytes) => bytes / 8000000;
const array = [];

const logSpeed = (e) => {
  if (e.type === 'download' || e.type === 'upload') {
    // bar.update(parseInt(e.progress * 100));
    progress = parseInt(e.progress * 100, 10);
    if (!(progress % 10)) {
      if (!array.includes(progress)) {
        array.push(progress);
      }
      console.log(array.join(','));
    }
  }
};
const options = {
  acceptLicense: true,
  acceptGdpr: true,
  verbosity: 1,
  progress: logSpeed,
};

export async function get(req, res, next) {
  bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar.start(100, 0);
  // let speed = await getSpeed(10);
  const speed = await speedTest(options);
  console.log(speed);
  // let respString = `${speed} bytes per second`;
  const download = bytesToMegabits(speed.download.bytes);
  const upload = bytesToMegabits(speed.upload.bytes);
  const respString = `Download: ${download}\nUpload: ${upload}`;
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify({ speed: respString }));
}
export function post(req, res, next) {
  const { clientForm } = req.body;
  console.log(`post on server: ${clientForm}`);
  res.writeHead(200, {
    'Content-type': 'application/json',
  });
  res.end(JSON.stringify(clientForm));
}
