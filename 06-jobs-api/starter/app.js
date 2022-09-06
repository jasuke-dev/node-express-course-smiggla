require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//connect DB
const connectDB = require('./db/connect')

//routes
const authRouter = require('./routes/auth')
const jobRouter = require('./routes/jobs')

const authenticateUser = require('./middleware/authentication')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// extra security package
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

app.set('trust proxy') //ketika deploy ke heroku dll
app.use(rateLimiter({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'too many requests sent by this ip, please try again in an hour !'
}));

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
// extra packages

// routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs', authenticateUser ,jobRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    console.log('connecting db...');
    await connectDB(process.env.MONGO_URI)
    console.log('DB connected');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
