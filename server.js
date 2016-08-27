var express    = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');

//Rutas de peticiones
var resumen = require('./routes/resumen');
var combos = require('./routes/rcombos');
var comentarios = require('./routes/rcomentarios');
var empresa = require('./routes/rempresas');
var estaciones = require('./routes/restaciones');
var mangas = require('./routes/rmangas');
var ordenes = require('./routes/rordenes');
var sugerencias = require('./routes/rsugerencias');
var usuarios = require('./routes/rusuarios');
var vasos = require('./routes/rvasos');

var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@winvisual-mongo.eastus.cloudapp.azure.com:27017/Foseto', function (err, db)
{
    if (err) {
        console.log(err);
    }
    else{
        console.log('Connected to the Database');
    }
});
// Express app will use body-parser to get data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Set port
var port = process.env.PORT || 8888;        // set the port

// Define a prefix for all routes
// Can define something unique like MyRestAPI
// We'll just leave it so all routes are relative to '/'
app.options('*', cors()); // enable pre-flight request for DELETE request

app.use('/resumen', resumen);
app.use('/usuarios', usuarios);
app.use('/combos', combos);
app.use('/comentarios', comentarios);
app.use('/empresa', empresa);
app.use('/estaciones', estaciones);
app.use('/mangas', mangas);
app.use('/ordenes', ordenes);
app.use('/sugerencias', sugerencias);
app.use('/usuarios', usuarios);
app.use('/vasos', vasos);
app.use(cors());
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-M", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
*/
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Start server listening on port 8080
app.listen(port);
console.log('SERVER listening on port: ' + port);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/*
// Define relevant info
var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1NDNkZjYyNy00YWEyLTQ2Y2MtOGM0Yy0xMzNhYTRjM2U5NDEifQ.5c5Rz9whIC7kY_o7_i6zfHJD05DqBK2ZXiHwaQdnXyI';
var tokens = ['your', 'target', 'tokens'];
var profile = 'FosetoClient';

// Build the request object
var req = {
  method: 'POST',
  url: 'https://api.ionic.io/push/notifications',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + jwt
  },
  data: {
    "tokens": tokens,
    "profile": profile,
    "notification": {
      "title": "Hi",
      "message": "Hello world!",
      "android": {
        "title": "Hey",
        "message": "Hello Android!"
      },
      "ios": {
        "title": "Howdy",
        "message": "Hello iOS!"
      }
    }
  }
};

// Make the API call
$http(req).success(function(resp){
  // Handle success
  console.log("Ionic Push: Push success", resp);
}).error(function(error){
  // Handle error 
  console.log("Ionic Push: Push error", error);
});
*/

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
