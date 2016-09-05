var express = require('express');
var router = express.Router();

var ffi = require("ffi");
var gpio = ffi.Library('./lib/libgpio', {
  "pinMode": [ "void", [ "int", "string" ] ],
  "digitalWrite": [ "void",  ["int", "int"] ],
  "digitalRead": [ "int",   ["int"]  ]
});

//gpio.pinMode(#,"OUTPUT"); //Led1
//gpio.pinMode(#,"OUTPUT"); //Led2
//gpio.pinMode(#,"OUTPUT"); //Led3
//gpio.pinMode(#,"OUTPUT"); //Led4
//gpio.pinMode(#,"OUTPUT"); //Led5


// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de leds recibida: ', dateDisplayed(Date.now()));
    next();
});

router.route('/')
        .post(function (req, res) {
            //gpio.digitalWrite(req.body.num, req.body.valor);
            res.send(true);
        })

        .get(function (req, res) {
            var leds= [
            //gpio.digitalRead(#),
            //gpio.digitalRead(#),
            //gpio.digitalRead(#),
            //gpio.digitalRead(#),
            //gpio.digitalRead(#)
            ];
            res.send(leds);
        });

module.exports = router;
function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}