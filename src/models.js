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
  longitude: Number
});

const Dummy = mongoose.model('Dummy', DummySchema);
const SpeedTest = mongoose.model('SpeedTest', SpeedTestSchema);
export { Dummy, SpeedTest };
