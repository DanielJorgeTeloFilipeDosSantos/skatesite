'use strict';

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const serveFavicon = require('serve-favicon');
//adicionado
const hbs = require('hbs');
const bcrypt = require('bcrypt');
const path = require('path');


const app = express();

// Setup view engine
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(express.static(join(__dirname, 'public')));
app.use(sassMiddleware({
  src: join(__dirname, 'public'),
  dest: join(__dirname, 'public'),
  outputStyle: process.env.NODE_ENV === 'development' ? 'nested' : 'compressed',
  sourceMap: true
}));


//routes -------------------------------------------------------------- routes -------------------- routes ----------------

const indexRouter = require('./routes/index');
const spotsRouter = require('./routes/map');
const usersRouter = require('./routes/authentication');
const usersUpdateRouter = require('./routes/userUpdate');
const createSpotRouter = require('./routes/createSpot');
const singleSpotRouter = require('./routes/singlespot');



app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/map', spotsRouter);
app.use('/userUpdate', usersUpdateRouter);
app.use('/createSpot', createSpotRouter);
app.use('/singlespot', singleSpotRouter);

//---------------------------------------------------------------------- routes ------------------- routes ----------------

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  res.status(error.status || 500);
  res.render('error');
});

module.exports = app;
