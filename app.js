import createError from 'http-errors';
import express, {json, urlencoded} from 'express';
import {join, dirname} from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {fileURLToPath} from 'url';
import mongoose, {connect} from 'mongoose';
import session from 'express-session';
import flash from 'express-flash';
import * as dotenv from 'dotenv';

dotenv.config();

import indexRouter from './routes/index.js';
import authRouter from './routes/auth.js';
import messageRouter from './routes/message.js';
import passport from './passport/setup.js';

const app = express();

// database set up
connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(json());

app.use(session({
  secret: 'cats',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false},
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));
app.use(flash());

// custom middleware
// get current user
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/message', messageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error', {title: 'Error'});
});

export default app;
