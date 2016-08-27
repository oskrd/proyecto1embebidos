var express = require('express');
var router = express.Router();

var Comentarios = require('../models/Comentarios');

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de comentario recibida: ', dateDisplayed(Date.now()));
    next();
});

// Obtiene los últimos 10 comentarios
router.route('/lista')
        .get(function (req, res) {
            console.log("Lista");
            Comentarios.find({}, {__v: 0}, function (err, messages) {
                if (err) {
                    res.send(err);
                    console.log("Error");
                } else {
                    res.json(messages);
                    console.log("Completado");
                }
            }).sort({_id: -1}).limit(10);
        });

// Agrega un comentario
router.route('/nuevo')
        .put(function (req, res) {
            console.log("Nuevo");
            var message = new Comentarios();
            message.nombre = req.body.nombre;
            message.comentario = req.body.comentario;
            message.valoracion = req.body.valoracion;
            message.foto = req.body.foto;
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

// Operaciones con id
router.route('/borrar')
        // Borra un comentario
        .post(function (req, res) {
            console.log("Borrar");
            Comentarios.remove({
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