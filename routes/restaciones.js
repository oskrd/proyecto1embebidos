var express = require('express');
var router = express.Router();

var Estaciones = require('../models/Estaciones');
var Mangas = require('../models/Mangas');

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de estacion recibida: ', dateDisplayed(Date.now()));
    next();
});

// Obtiene todas las estaciones
router.route('/lista')
        .get(function (req, res) {
            function concatenar(arg, largo) {
                lista.push(arg[0]);
                if (largo === lista.length) {
                 /*   console.log("aaaaa");
                    console.log(lista);
                    console.log("adasdas")
                    console.log(lista.reverse());*/
                    res.json(lista);
                    console.log("Completado");
                }
            }
            console.log("Lista");
            var lista = [];
            var promesa = Estaciones.find({}, {}).exec();
            promesa.then(function (estaciones) {
                var Promise = require('bluebird');

                var ForEstaciones = Promise.method(function (condition, action, value) {
                    if (!condition(value))
                        return value;
                    return action(value).then(ForEstaciones.bind(null, condition, action));
                });

                ForEstaciones(function (count) {
                    return count < estaciones.length;
                }, function (count) {
                    return Estaciones.find({_id: estaciones[count]._id}, {__v: 0})
                            .then(function (estacion) {
                                var tmp = [];
                                var tmpmanga = [];
                                var ForMangas = Promise.method(function (condition, action, value) {
                                    if (!condition(value))
                                        return value;
                                    return action(value).then(ForMangas.bind(null, condition, action));
                                });
                                ForMangas(function (cuenta) {
                                    return cuenta < estacion[0].mangas.length;
                                }, function (cuenta) {
                                    return Mangas.findOne({_id: estacion[0].mangas[cuenta]}, {__v: 0})
                                            .then(function (manga) {
                                                if (manga.producto === null) {
                                                    var tmp = {producto: {}, capacidad: manga.capacidad,
                                                        reservado: manga.reservado, disponible: manga.disponible, _id: manga._id};
                                                } else {
                                                    var tmp = {producto: manga.producto[0], capacidad: manga.capacidad,
                                                        reservado: manga.reservado, disponible: manga.disponible, _id: manga._id};
                                                }
                                                tmpmanga.push(tmp);
                                                return ++cuenta;
                                            });
                                }, 0)
                                        .then(function (manga) {
                                            var tmpjson = {
                                                _id: estacion[0]._id,
                                                mangas: tmpmanga,
                                                tamano: estacion[0].tamano,
                                                precio: estacion[0].precio,
                                                nombre: estacion[0].nombre,
                                                color: estacion[0].color,
                                                fondo: estacion[0].fondo,
                                                tipo: estacion[0].tipo
                                            };
                                            tmp.push(tmpjson);
                                            concatenar(tmp, estaciones.length);
                                        });
                                return ++count;
                            });
                }, 0);
            });
        });

// Agrega una estacion
router.route('/nuevo')
        .put(function (req, res) {
            console.log("Nuevo");
            var message = new Estaciones();
            message.nombre = req.body.nombre;
            message.precio = req.body.precio;
            message.tamano = req.body.tamano;
            message.mangas = req.body.mangas;
            message.color = req.body.color;
            message.fondo = req.body.fondo;
            message.tipo = req.body.tipo;
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
        // Modifica una estacion
        .post(function (req, res) {
            console.log("Editar");
            Estaciones.findOne({_id: req.body._id}, function (err, message) {
                if (err)
                    res.send(err);
                else if (message !== null) {
                    message.nombre = req.body.nombre;
                    message.precio = req.body.precio;
                    message.tamano = req.body.tamano;
                    message.mangas = req.body.mangas;
                    message.color = req.body.color;
                    message.fondo = req.body.fondo;
                    message.tipo = req.body.tipo;
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
        // Borra una estacion
        .post(function (req, res) {
            console.log("Borrar");
            Estaciones.findOne({_id: req.body._id}, {}).exec()
                    .then(function (estacion) {
                        var Promise = require('bluebird');
                        var ForMangas = Promise.method(function (condition, action, value) {
                            if (!condition(value))
                                return value;
                            return action(value).then(ForMangas.bind(null, condition, action));
                        });
                        ForMangas(function (cuenta) {
                            return cuenta < estacion.mangas.length;
                        }, function (cuenta) {
                            return Mangas.findOne({_id: estacion.mangas[cuenta]}, {__v: 0})
                                    .then(function (manga) {
                                        Mangas.remove({_id: manga._id}, function (err) {
                                            if (err)
                                                console.log(err);
                                            else
                                                console.log("ok");
                                        });
                                        return ++cuenta;
                                    });
                        }, 0);
                    })
                    .then(function (estacion) {
                        Estaciones.remove({
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


        });

module.exports = router;

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}