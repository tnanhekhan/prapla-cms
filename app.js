const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const liveReload = require("livereload");
const connectLiveReload = require("connect-livereload");
const cors = require('cors');
require('dotenv').config()

const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const cmsRouter = require('./routes/cms');
const wordsRouter = require('./routes/words');
const listsRouter = require('./routes/lists');
const studentsRouter = require('./routes/students');
const apiRouter = require('./routes/api');

const publicDir = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {


    const liveReloadServer = liveReload.createServer();
    liveReloadServer.watch(publicDir);
    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 50);
    });
}
const app = express();
if (process.env.NODE_ENV === 'development') {
    app.use(connectLiveReload());
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(publicDir));
app.use(cors());

app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/cms', cmsRouter);
app.use('/cms/words', wordsRouter);
app.use('/cms/lists', listsRouter);
app.use('/cms/students', studentsRouter);
app.use('/cms/users', usersRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
