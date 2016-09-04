var express = require('express');
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
            res.send(true);
        });

module.exports = router;

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}