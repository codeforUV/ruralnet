import { SpeedTest } from '../../models';
import { parse } from 'json2csv';
import { SpeedTest } from '../models';

// returns aggregated speedtest info in a tsv file (because some fields have commas)
export async function get (req, res, next) {
    // GET still requires password
    if (req.query.r === process.env.TSV_RELEASE) {  // requires TSV_RELEASE environment variable
        const rawData = await SpeedTest.find({}).exec();
        const data = rawData.map(item => {return item._doc});
        const options = {'delimiter': '\t'};
        const tsv = parse(data, options);
        res.writeHead(200, {
            'Content-Type': 'text/tab-separated-values',
            'Content-Disposition': 'attachment; filename=speedtestExport.tsv'
        })
        res.write(tsv);
        res.end();
    } else {
        res.writeHead(404);
        res.end();
    }
    
}

export async function post(req, res, next) {
  // POST is just a second route to check if a password entered in the prompt is valid
  if (req.query.r === process.env.TSV_RELEASE) {
    res.writeHead(200, {
      'Content-Type': 'application.json',
    });
    res.end(JSON.stringify({ trust: true }));
  } else {
    res.writeHead(200, {
      'Content-Type': 'application.json',
    });
    res.end(JSON.stringify({ trust: false }));
  }
}
