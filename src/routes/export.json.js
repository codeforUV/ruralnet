import { SpeedTest } from '../models';
import { parse } from 'json2csv';

export async function get (req, res, next) {
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
}