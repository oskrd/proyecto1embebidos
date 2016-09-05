var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

//Rutas de peticiones
var usuarios = require('./routes/usuarios');
var leds = require('./routes/leds');
var puertas = require('./routes/puertas');
var camara = require('./routes/camara');

// Express app will use body-parser to get data from POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Set port
var port = process.env.PORT || 8888;        // set the port

// Define a prefix for all routes
app.use('/usuarios', usuarios);
app.use('/leds', leds);
app.use('/puertas', puertas);
app.use('/camara', camara);

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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
