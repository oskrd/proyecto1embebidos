var express = require('express');
var router = express.Router();

var Empresa = require('../models/Empresas');

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de empresa recibida: ', dateDisplayed(Date.now()));
    next();
});

router.route('/contacto')
        // Obtiene la empresa
        .get(function (req, res) {
            console.log("Contacto");
            Empresa.findOne({}, {mision: 0, vision: 0, quesomos: 0, __v: 0, _id: 0}, function (err, messages) {
                if (err) {
                    res.send(err);
                    console.log("Error");
                } else {
                    res.json(messages);
                    console.log("Completado");
                }
            });
        });

router.route('/acercade')
        // Obtiene la empresa
        .get(function (req, res) {
            console.log("Acerca de");
            Empresa.findOne({}, {__v: 0, _id: 0, ubicacion: 0, mapa: 0, email: 0, telefono: 0}, function (err, messages) {
                if (err) {
                    res.send(err);
                    console.log("Error");
                } else {
                    res.json(messages);
                    console.log("Completado");
                }
            });
        });

router.route('/editar')
        // Modifica la empresa
        .post(function (req, res) {
            console.log("Editar");
            Empresa.findOne({_id: req.body.nombre}, function (err, message) {
                if (err) {
                    res.send(err);
                    console.log("Error");
                } else {
                    message.mision = req.body.mision;
                    message.vision = req.body.vision;
                    message.quesomos = req.body.quesomos;
                    message.ubicacion = req.body.ubicacion;
                    message.email = req.body.email;
                    message.telefono = req.body.telefono;
                    message.mapa = req.body.mapa;

                    message.save(function (err) {
                        if (err) {
                            res.send(err);
                            console.log("Error");
                        } else {
                            res.json(true);
                            console.log("Completado");
                        }
                    });
                }
            });
        });

module.exports = router;

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}