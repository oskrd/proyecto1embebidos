var express = require('express');
var fs = require('fs');
var jpegjs = require("jpeg-js");
var router = express.Router();
var v4l2camera = require("v4l2camera");
var cam = new v4l2camera.Camera("/dev/video0");

if (cam.configGet().formatName !== "YUYV") {
    console.log("Error de camara");
    process.exit(1);
}

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de camara recibida: ', dateDisplayed(Date.now()));
    next();
});

// Obtiene la foto
router.route('/')
        .get(function (req, res) {
            cam.start();
            cam.capture(function (success) {
                saveAsJpg(cam.toRGB(), cam.width, cam.height, "./images/result.jpg");
                cam.stop();
            });
            waitTime(res);
        });

//Espera que la imagen se cree en el fs
function waitTime(res) {
    setTimeout(function () {
        var base64str = base64_encode('./images/result.jpg');
        res.send(base64str);
    }, 400);
}

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

var saveAsJpg = function (rgb, width, height, filename) {
    var size = width * height;
    var rgba = {data: new Buffer(size * 4), width: width, height: height};
    for (var i = 0; i < size; i++) {
        rgba.data[i * 4 + 0] = rgb[i * 3 + 0];
        rgba.data[i * 4 + 1] = rgb[i * 3 + 1];
        rgba.data[i * 4 + 2] = rgb[i * 3 + 2];
        rgba.data[i * 4 + 3] = 255;
    }
    var jpeg = jpegjs.encode(rgba, 100);
    fs.createWriteStream(filename).end(Buffer(jpeg.data));


};

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
module.exports = router;
