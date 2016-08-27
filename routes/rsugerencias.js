var express = require('express');
var router = express.Router();

var Sugerencias = require('../models/Sugerencias');

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de sugerencias recibida: ', dateDisplayed(Date.now()));
    next();
});

// Obtiene todas las sugerencias
router.route('/lista')
        .get(function (req, res) {
            console.log("Lista");
            Sugerencias.find({}, {__v: 0}, function (err, messages) {
                if (err) {
                    res.send(err);
                    console.log("Error");
                } else {
                    res.json(messages);
                    console.log("Completado");
                }
            });
        });

// Agrega una sugerencia
router.route('/nuevo')
        .put(function (req, res) {
            console.log("Nuevo");
            var message = new Sugerencias();
            message.nombre = req.body.nombre;
            message.correo = req.body.correo;
            message.asunto = req.body.asunto;
            message.comentario = req.body.comentario;
            message.save(function (err) {
                if (err) {
                    res.send(err);
                    console.log("Error");
                } else {
                    res.json(true);
                    console.log("Completado");
                }
            });
        });


router.route('/borrar')
        // Borra un vaso
        .post(function (req, res) {
            console.log("Borrar");
            Sugerencias.remove({
                _id: req.body._id
            }, function (err) {
                if (err) {
                    res.send(err);
                    console.log("Error");
                } else {
                    res.json(true);
                    console.log("Completado");
                }
            });
        });

module.exports = router;

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}