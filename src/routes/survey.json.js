import { SurveyTest } from '../models';

export async function get(req, res, next) {
  try {
    const data = await SurveyTest.find({}).exec();
    res.writeHead(200).end(JSON.stringify({ docs: data }));
  }
  catch (err) {
    console.log(SurveyTest);
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
    await SurveyTest.deleteOne({ _id: id });
    res.writeHead(200).end(JSON.stringify({ resp: 'document deleted succesfully' }));
  }
  catch (err) {
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
    let newSurvey, saved;
    if (data._id) {
      await SurveyTest.updateOne({_id: data._id}, { $set: data}).exec();
    }
    else {
      newSurvey = new SurveyTest(data);
      saved = await newSurvey.save();
    }
    if (saved === newSurvey) {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ msg: 'Data saved successfully', entryId: newSurvey._id }));  // possibly not smart but stick with me or rembember this spot
    }
    else {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ resp: 'Problem saving data' }));
    }
  }
  catch (err) {
    console.log(err.stack);
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ resp: err.stack }));
  }
}