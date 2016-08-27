var express = require('express');
var router = express.Router();

var Vasos = require('../models/Vasos');

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de vasos recibida: ', dateDisplayed(Date.now()));
    next();
});

// Obtiene todos los vasos
router.route('/lista')
        .get(function (req, res) {
            console.log("Lista");
            Vasos.find({}, {__v: 0}, function (err, messages) {
                if (err) {
                    res.send(err);
                    console.log("Error");
                } else {
                    res.json(messages);
                    console.log("Completado");
                }
            });
        });

// Agrega un vaso
router.route('/nuevo')
        .put(function (req, res) {
            console.log("Nuevo");
            var message = new Vasos();
            message.nombre = req.body.nombre;
            message.cantidad = req.body.cantidad;
            message.capacidad = req.body.capacidad;
            message.foto = req.body.foto;
            message.reservados = 0;
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

router.route('/editar')
        //Modifica un vaso
        .post(function (req, res) {
            console.log("Modificar");
            Vasos.findOne({_id: req.body._id}, function (err, message) {
                if (err) {
                    res.send(err);
                    console.log("Error");
                } else if (message !== null) {
                    message.nombre = req.body.nombre;
                    message.cantidad = req.body.cantidad;
                    message.capacidad = req.body.capacidad;
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
                } else {
                    res.json(false);
                    console.log("Completado");
                }
            });
        });

 router.route('/borrar')       // Borra un vaso
        .post(function (req, res) {
            console.log("Borrar");
            Vasos.remove({
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