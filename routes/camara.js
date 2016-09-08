var spawn = require('child_process').spawn;
var express = require('express');
var fs = require('fs');
var router = express.Router();

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de camara recibida: ', dateDisplayed(Date.now()));
    next();
});

// Obtiene la foto
router.route('/')
        .get(function (req, res) {
            spawn('fswebcam', ["--no-banner", "./images/image.jpg"]);
            waitTime(res);
        });

//Espera que la imagen se cree en el fs
function waitTime(res) {
    setTimeout(function () {
        try {
            var base64str = base64_encode('./images/image.jpg');
            res.send(base64str);
        } catch (err) {
            res.send(false);
        }

    }, 500);
}

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

module.exports = router;
