import { Dummy } from '../models';

export async function get(req, res, next) {
  try {
    const data = await Dummy.find({}).exec();
    res.writeHead(200).end(JSON.stringify({ docs: data }));
  } catch (err) {
    console.log(Dummy);
    console.log(err.stack);
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ resp: err.stack }));
  }
}

export async function del(req, res, next) {
  try {
    const { id } = req.body;
    await Dummy.deleteOne({ _id: id });
    res.writeHead(200).end(JSON.stringify({ resp: 'document deleted succesfully' }));
  } catch (err) {
    console.log(err.stack);
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ resp: err.stack }));
  }
}

export async function post(req, res, next) {
  const data = req.body;
  try {
    const newDummy = new Dummy(data);
    const saved = await newDummy.save();
    if (saved === newDummy) {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ msg: 'Data saved successfully' }));
    } else {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ resp: 'Problem saving data' }));
    }
  } catch (err) {
    console.log(err.stack);
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ resp: err.stack }));
  }
}
