var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors=require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var departmentRouter = require('./routes/department');
var facultyRouter = require('./routes/faculty');
var statecityRouter = require('./routes/statecity');
var coursesRouter = require('./routes/courses');
var studentRouter = require('./routes/student');
var subjectsRouter = require('./routes/subjects');
var unitsRouter = require('./routes/units');
var createsetRouter = require('./routes/createset');
var questionsRouter = require('./routes/questions');
var adminRouter = require('./routes/admin');
var scheduleexamsRouter = require('./routes/scheduleexams');
var admissionRouter = require('./routes/admission');
var smsapiRouter = require('./routes/smsapi');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/department', departmentRouter);
app.use('/faculty', facultyRouter);
app.use('/statecity', statecityRouter);
app.use('/courses', coursesRouter);
app.use('/student', studentRouter);
app.use('/subjects',subjectsRouter);
app.use('/units',unitsRouter);
app.use('/createset',createsetRouter);
app.use('/admin',adminRouter);
app.use('/questions',questionsRouter);
app.use('/scheduleexams',scheduleexamsRouter);
app.use('/admission',admissionRouter)
app.use('/smsapi',smsapiRouter)

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
  res.render('error');
});

module.exports = app;
