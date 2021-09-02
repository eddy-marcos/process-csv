import express from 'express';
import error from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// route
import csvFileRouter from './routes/csv.js';

// init express app
var app = express(); 

// view engine setup
const __dirname = path.resolve();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// api path
app.use('/api/csv', csvFileRouter);

// if 404 error
app.use((req, res, next) => {
  next(error(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // error page
  res.status(err.status || 500);
  res.render('error');
});


export default app;
