import mongoose from 'mongoose';

const { Schema } = mongoose;

const DummySchema = new Schema({
  text: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

const SpeedTestSchema = new Schema({
  // these keys match the keys of finalDataJson in speed.svelte - hopefully that makes adding data super easy as demoed in database.json.js
  ipAddress: String,
  internetProvider: String,
  downloadSpeed: Number,
  uploadSpeed: Number,
  date: {
    type: String,
    default: Date.now(),
  },
  time: String,
  city: String,
  ping: Number,
  latitude: Number,
  longitude: Number,
});

const SurveyTestSchema = new Schema({
  survey: {
    questions: Array,
    answers: Array
  }
});



const SurveySubmissionsSchema = new Schema({
  date: {
    type: String,
    default: Date.now(),
  },
  city: String,
  state: String,
  answers: [{
    questionId: String,
    answer: String
  }]
});

const Dummy = mongoose.model('Dummy', DummySchema);
const SpeedTest = mongoose.model('SpeedTest', SpeedTestSchema);
const SurveyTest = mongoose.model('SurveyTest', SurveyTestSchema);
const SurveySubmissions = mongoose.model('SurveySubmissions', SurveySubmissionsSchema);
export { Dummy, SpeedTest, SurveyTest, SurveySubmissions };
