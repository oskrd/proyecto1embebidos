var express = require('express');
var TAFFY = require('taffy');
var puertas = TAFFY([{puerta: "1", valor: "0"},
    {puerta: "2", valor: "0"},
    {puerta: "3", valor: "0"}]);

var router = express.Router();

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de sugerencias recibida: ', dateDisplayed(Date.now()));
    next();
});

//Obtiene los datos de puertas
router.route('/')
        .get(function (req, res) {
            res.send(puertas().select("valor"));
        })

module.exports = router;

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}