var express = require('express');
var router = express.Router();

var ffi = require("ffi");
var gpio = ffi.Library('./lib/libgpio', {
  "pinMode": [ "void", [ "int", "string" ] ],
  "digitalWrite": [ "void",  ["int", "int"] ],
  "digitalRead": [ "int",   ["int"]  ]
});

//gpio.pinMode(#,"INPUT"); //Puerta1
//gpio.pinMode(#,"INPUT"); //Puerta2
//gpio.pinMode(#,"INPUT"); //Puerta3

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de puertas recibida: ', dateDisplayed(Date.now()));
    next();
});

//Obtiene los datos de puertas
router.route('/')
        .get(function (req, res) {
            var puertas= [
            //gpio.digitalRead(#),
            //gpio.digitalRead(#),
            //gpio.digitalRead(#)
            ];
            res.send(puertas);
        });

module.exports = router;

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}