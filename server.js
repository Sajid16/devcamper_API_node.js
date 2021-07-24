const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');

// load env variables
dotenv.config({ path: './config/config.env' });

// connecting to database
connectDB();

const app = express();

// body parser
app.use(express.json());

// below line indicates that the created middleware is ready to use
// below line er jonne all controller function a middleware variables gular access pabo
app.use(logger);
// end of middleware

// initilizing routes
// app testing api
app.get('/', (req, res) => {
  return res.send({
    message: `Devcamper API project is working on port ${PORT} successfully`,
  });
});

// route files
const bootcamps = require('./routes/bootcamps.js');
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// it is a global handler for unhandled promise rejection, helps to skip try catch block
// handling unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // closing server and exit process
  server.close(() => process.exit(1));
});
