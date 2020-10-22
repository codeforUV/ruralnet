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
  ipAddress: String,
  download: Number,
  upload: Number,
  date: {
    type: String,
    default: Date.now(),
  },
});

const Dummy = mongoose.model('Dummy', DummySchema);
const SpeedTest = mongoose.model('SpeedTest', SpeedTestSchema);
export { Dummy, SpeedTest };
