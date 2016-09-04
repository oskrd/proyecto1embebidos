var express = require('express');
var blowfish = require('blowfish');
var TAFFY = require('taffy');
var bf = new blowfish("pi");
var router = express.Router();
var usuarios = TAFFY();

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de usuarios recibida: ', dateDisplayed(Date.now()));
    next();
});

// Agrega un usuario
router.route('/nuevo')
        .post(function (req, res) {
            console.log("Nuevo");

            if (usuarios({user: req.body.user}).first() === false) {
                var pass = bf.encrypt(req.body.pass);
                usuarios.insert({user: req.body.user, pass: pass});
                res.send(true);
            } else {
                res.send(false);
            }
        });

// Logueo de usuario
router.route('/login')
        .post(function (req, res) {
            console.log("Login");
            var user= usuarios({user: req.body.user}).first();
            if ( user !== false) {
                var pass= bf.encrypt(req.body.pass);
                if (user.pass === pass){
                    res.send(true);
                }else
                    res.send(false);
            }else{
                res.send(false);
            }
        });

module.exports = router;
function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}