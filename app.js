import express from 'express';
import error from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import exphbs from 'express-handlebars';

// route
import csvFileRouter from './routes/csv.js';

// init express app
var app = express(); 

// handlebars setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.get('/', function (req, res) {
    res.render('home');
});

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
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // error page
  res.status(err.status || 500);
  res.render('error');
});


export default app;
