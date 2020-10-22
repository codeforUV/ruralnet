import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const { PORT, NODE_ENV } = process.env;
let { MONGODB_URI } = process.env;
const dev = NODE_ENV === 'development';
// Try loading mongo credential from environment variables first (which should work on Heroku)
// Otherwise load them from a .env file (when working locally; you'll need a .env file in this dir)
dotenv.config();
MONGODB_URI = dev ? process.env.MONGODB_URI : MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Database connected successfully');
});

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    bodyParser.json(),
    sapper.middleware()
  )
  .listen(PORT, (err) => {
    if (err) console.log('error', err);
  });
