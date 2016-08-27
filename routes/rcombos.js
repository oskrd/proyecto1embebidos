var express = require('express');
var router = express.Router();

var Combos = require('../models/Combos');

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de Combo recibida: ', dateDisplayed(Date.now()));
    next();
});

// Obtiene todos los combos
router.route('/lista')
        .get(function (req, res) {
            console.log("Lista");
            Combos.find({}, {_v: 0}, function (err, messages) {
                if (err) {
                    res.send(err);
                    console.log("Error");
                } else {
                    res.json(messages);
                    console.log("Completado");
                }
            });
        });

// Agrega un combo
router.route('/nuevo')
        .put(function (req, res) {
            console.log("Nuevo");
            var message = new Combos();
            message.foto = req.body.foto;
            message.nombre = req.body.nombre;
            message.vaso = req.body.vaso;
            message.precio = req.body.precio;
            message.descripcion = req.body.descripcion;
            message.ingredientes = req.body.ingredientes;

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
router.route('/editar')
        // Modifica un combo
        .post(function (req, res) {
            console.log("Editar");
            Combos.findOne({_id: req.body._id}, function (err, message) {
                if (err) {
                    res.send(err);
                    console.log("Error");
                } else if (message !== null) {
                    message.nombre = req.body.nombre;
                    message.foto = req.body.foto;
                    message.vaso = req.body.vaso;
                    message.precio = req.body.precio;
                    message.descripcion = req.body.descripcion;
                    message.ingredientes = req.body.ingredientes;

                    message.save(function (err) {
                        if (err) {
                            res.send(err);
                            console.log("Error");
                        } else {
                            res.json(true);
                            console.log("Completado");
                        }
                    });
                } else {
                    res.json(false);
                    console.log("Completado");
                }
            });
        });
router.route('/borrar')
        // Borra un combo
        .post(function (req, res) {
            console.log("Borrar");
            Combos.remove({
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