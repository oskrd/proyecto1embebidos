var express = require('express');
var fs = require('fs');
//var gpio = require("../build/Release/gpio")
var router = express.Router();

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de vasos recibida: ', dateDisplayed(Date.now()));
    next();
});

// Obtiene la foto
router.route('/')
        .get(function (req, res) {
            console.log("FOTO");
            //var path= gpio??
            //var base64str = base64_encode(path);
            var base64str = base64_encode('./images/a.png');
            res.send(base64str);
        });

module.exports = router;

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}