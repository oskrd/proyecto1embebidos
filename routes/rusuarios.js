var express = require('express');
var router = express.Router();

var Usuarios = require('../models/Usuarios');

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de usuarios recibida: ', dateDisplayed(Date.now()));
    next();
});

// Agrega un usuario
router.route('/nuevo')
        .put(function (req, res) {
            console.log("Nuevo");
            console.log(req.body);
            Usuarios.findOne({_id: req.body.correo}, {}, function (err, message) {
                if (err) {
                    res.send(err);
                    console.log("Error");
                } else if (message === null) {
                    //El usuario no existe
                    var message = new Usuarios();
                    message.nombre = req.body.nombre;
                    message._id = req.body.correo;
                    message.password = req.body.password;
                    message.fechaNac = req.body.fechaNac;
                    message.fechaReg = req.body.fechaReg;
                    message.foto = req.body.foto;
                    message.historial = [];
                    message.carrito = [];

                    message.save(function (err) {
                        if (err) {
                            res.json(err);
                            console.log("Error");
                        } else {
                            res.json(true);
                            console.log("Completado");
                        }
                    });
                } else {
                    //Correo encontrado
                    res.json(false);
                    console.log("Completado");
                }
            });

        });

// Logueo de usuario
router.route('/login')
        .post(function (req, res) {
            console.log("Login");
            Usuarios.findOne({_id: req.body.correo}, {password: 1}, function (err, message) {
                if (err) {
                    console.log("Error");
                    res.send(err);
                } else if (message !== null) {
                    //El usuario existe
                    if (message.password === req.body.password) {
                        //Logueo correcto
                        return Usuarios.findOne({_id: req.body.correo}, {__v: 0, password: 0, historial: 0}).exec()
                                .then(function (message) {
                                    if (err) {
                                        res.send(err);
                                        console.log("Error");
                                    } else {
                                        var respuesta = {};
                                        respuesta.nombre = message.nombre;
                                        respuesta._id = message._id;
                                        respuesta.fechaNac = message.fechaNac;
                                        respuesta.fechaReg = message.fechaReg;
                                        respuesta.foto = message.foto;
                                        respuesta.carrito = message.carrito.length;
                                        res.json(respuesta);
                                        console.log("Completado");
                                    }
                                });
                    } else {
                        //Contraseña incorrecta
                        res.json(false);
                        console.log("Completado");
                    }
                } else {
                    //Correo no encontrado
                    res.json(false);
                    console.log("Completado");
                }
            });
        });

// Logueo de usuario
router.route('/password')
        .post(function (req, res) {
            console.log("Editar Password");
            Usuarios.findOne({_id: req.body.correo}, {password: 1}, function (err, message) {
                if (err) {
                    res.send(err);
                    console.log("Error");
                } else if (message.password === req.body.password) {
                    //password correcto
                    message.password = req.body.nuevopassword;

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
                    //password incorrecta
                    res.json(false);
                    console.log("Completado");
                }

            });
        });

// Operaciones con id
router.route('/editar')
        // Modifica un usuario
        .post(function (req, res) {
            console.log("Editar");
            Usuarios.findOne({_id: req.body.correo}, function (err, message) {
                if (err) {
                    res.send(err);
                    console.log("Error");
                } else if (message !== null) {
                    message.nombre = req.body.nombre;
                    message.fechaNac = req.body.fechaNac;
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
        })

        // Borra un usuario
        .delete(function (req, res) {
            console.log("Borrar");
            Usuarios.remove({
                _id: req.body.correo
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