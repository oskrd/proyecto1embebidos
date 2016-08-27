var express = require('express');
var router = express.Router();

var Mangas = require('../models/Mangas');
var Estaciones = require('../models/Estaciones');

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de manga recibida: ', dateDisplayed(Date.now()));
    next();
});

// Obtiene todas las mangas
router.route('/lista')
        .get(function (req, res) {
            console.log("Lista");
            Mangas.find({}, {__v: 0}, function (err, messages) {
                if (err)
                    res.send(err);
                else
                    res.json(messages);
            });
        });

// Agrega una manga
router.route('/nuevo')
        .put(function (req, res) {
            console.log("Nuevo");
            var message = new Mangas();
            message.producto = req.body.producto;
            message.capacidad = req.body.capacidad;
            message.reservado = 0;
            message.disponible = req.body.disponible;
            message.save();

            Estaciones.findOne({_id: req.body._idEstacion}, function (err, estacion) {
                estacion.mangas.push(message._id);
                estacion.save(function (err) {
                    if (err)
                        console.log(err);
                });
                res.json(true);
                console.log("Completado");
            });

        });

// Operaciones con id
router.route('/editar')
        // Modifica una manga
        .post(function (req, res) {
            console.log("Editar");
            Mangas.findOne({_id: req.body._id}, function (err, message) {
                if (err)
                    res.send(err);
                else if (message !== null) {
                    message.producto = req.body.producto;
                    message.capacidad = req.body.capacidad;
                    message.reservado = req.body.reservado;
                    message.disponible = req.body.disponible;
                    message.descripcion = req.body.descripcion;

                    message.save(function (err) {
                        if (err)
                            res.send(err);
                        else
                            res.json(true);
                    });
                } else {
                    res.json(false);
                }
            });
        });

// Borra una manga
router.route('/borrar')
        .post(function (req, res) {
            console.log("Borrar");
            Estaciones.findOne({_id: req.body._idEstacion}, function (err, estacion) {
                estacion.mangas.splice(estacion.mangas.indexOf(req.body._id), 1);
                estacion.save();
            }).exec()
                    .then(function (err) {
                        Mangas.remove({
                            _id: req.body._id
                        }, function (err) {
                            if (err)
                                res.send(err);
                            else
                                res.json(true);
                        });
                    });



        });

module.exports = router;

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}