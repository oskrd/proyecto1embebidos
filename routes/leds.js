var express = require('express');
//var gpio = require("../build/Release/gpio")
var TAFFY = require('taffy');
var router = express.Router();
var leds = TAFFY([{led: "1", valor: "0"},
    {led: "2", valor: "0"},
    {led: "3", valor: "0"},
    {led: "4", valor: "0"},
    {led: "5", valor: "0"}]);

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de leds recibida: ', dateDisplayed(Date.now()));
    next();
});

router.route('/')
        .post(function (req, res) {
            leds({led: req.body.num}).update({valor: req.body.valor});
            //  gpio.pinMode(2,"OUTPUT")
            res.send(true);
        })

        .get(function (req, res) {
            res.send(leds().select("valor"));
        });

module.exports = router;
function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}