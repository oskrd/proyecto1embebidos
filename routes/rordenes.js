var express = require('express');
var router = express.Router();
var Ordenes = require('../models/Ordenes');
var Usuarios = require('../models/Usuarios');
var Estaciones = require('../models/Estaciones');
var Mangas = require('../models/Mangas');
var Vasos = require('../models/Vasos');
// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de ordenes recibida: ', dateDisplayed(Date.now()));
    next();
});
// Obtiene todas las ordenes
router.route('/lista')
        .get(function (req, res) {
            console.log("Lista");
            Ordenes.find({}, {__v: 0}, function (err, messages) {
                if (err) {
                    res.send(err);
                    console.log("Error");
                } else {
                    res.json(messages);
                    console.log("Completado");
                }
            });
        });
// Agrega una orden
router.route('/nuevo')
        .put(function (req, res) {
            console.log("Nuevo");
            errores = false;

            var message = new Ordenes();
            Ordenes.find({}, {_id: 1}).exec()
                    .then(function (ordenes) {
                        message._id = Math.random().toString(36).substr(5, 9);
                        message.correo = req.body.correo;
                        message.fecha = req.body.fecha;
                        message.precio = req.body.precio;
                        message.vaso = req.body.vaso;
                        message.estado = 1;
                        message.peso = req.body.peso;
                        message.foto = req.body.foto;
                        message.progreso = 0;
                        message.ingredientes = req.body.ingredientes;
                        Usuarios.find({_id: req.body.correo}, {carrito: 1}, function (err, usuario) {
                            var tmp = usuario[0].carrito;
                            tmp.push(message._id);
                            usuario[0].carrito = tmp;
                            usuario[0].save(function (err) {
                                if (err)
                                    res.send(err);
                            });
                        });
                        var Promise = require('bluebird');
                        var ForMangas = Promise.method(function (condition, action, value) {
                            if (!condition(value))
                                return value;
                            return action(value).then(ForMangas.bind(null, condition, action));
                        });
                        ForMangas(function (cuenta) {
                            return cuenta < message.ingredientes.length;
                        }, function (cuenta) {
                            return Mangas.findOne({_id: message.ingredientes[cuenta]._idManga}, {__v: 0})
                                    .then(function (manga) {
                                        manga.reservado = manga.reservado + message.ingredientes[cuenta].pesoActual;
                                        manga.save();
                                        return ++cuenta;
                                    });
                        }
                        , 0);
                        Vasos.findOne({nombre: message.vaso}, {__v: 0}, function (err, data)
                        {
                            data.reservados = data.reservados + 1;
                            data.save();
                        }
                        );
                    })
                    .then(function (err) {
                        if (!errores) {
                            message.save(function (err) {
                                if (err)
                                    res.send(err);
                                else
                                    res.json(message._id);
                            });
                        } else
                            res.send(false);
                    });
        });

router.route('/historial')
        .post(function (req, res) {
            console.log("Historial");
            var lista = [];
            var Promise = require('bluebird');
            var promesa = Usuarios.findOne({_id: req.body.correo}, {__v: 0}).exec();
            promesa.then(function (usuario) {
                var historial = usuario.historial;
                var ForHistorial = Promise.method(function (condition, action, value) {
                    if (!condition(value))
                        return value;
                    return action(value).then(ForHistorial.bind(null, condition, action));
                });
                ForHistorial(function (count) {
                    return count < historial.length;
                }, function (count) {
                    return Ordenes.find({_id: historial[count]}, {__v: 0})
                            .then(function (orden) {
                                lista.push(orden[0]);
                                return ++count;
                            });
                }, 0)
                        .then(function () {
                            res.json(lista);
                            console.log("Completado");
                        });
            });
        });
// Agrega una orden
router.route('/carrito')
        .post(function (req, res) {
            console.log("Carrito");
            var lista = [];
            var Promise = require('bluebird');
            var promesa = Usuarios.findOne({_id: req.body.correo}, {__v: 0}).exec();
            promesa.then(function (usuario) {
                var carrito = usuario.carrito;
                var ForCarrito = Promise.method(function (condition, action, value) {
                    if (!condition(value))
                        return value;
                    return action(value).then(ForCarrito.bind(null, condition, action));
                });
                ForCarrito(function (count) {
                    return count < carrito.length;
                }, function (count) {
                    return Ordenes.find({_id: carrito[count]}, {__v: 0})
                            .then(function (orden) {
                                lista.push(orden[0]);
                                return ++count;
                            });
                }, 0)
                        .then(function () {
                            res.json(lista);
                            console.log("Completado");
                        });
            });
        });

//Obtiene una orden
router.route('/orden')
        // Modifica una orden
        .post(function (req, res) {
            console.log("Orden");
            Ordenes.findOne({_id: req.body._id}, {__v: 0}, function (err, message) {
                if (err)
                    console.log("Error");
                else if (message !== null) {
                    res.json(message);
                } else {
                    res.json(false);
                }

            });
        });

// Obtiene el progreso de la orden
router.route('/progreso')
        // Modifica una orden
        .post(function (req, res) {
            console.log("Progreso");
            Ordenes.findOne({_id: req.body._id}, function (err, message) {
                if (err)
                    console.log("Error");
                else {
                    res.json({progreso: message.progreso, estado: message.estado});
                    console.log("Completado");
                }
            });
        });

// Obtiene el progreso de la orden
router.route('/progresoR')
        // Modifica una orden
        .post(function (req, res) {
            var data = JSON.parse(req.body.data);
            console.log("Progreso");
            Ordenes.findOne({_id: data._id}, function (err, message) {
                if (err)
                    console.log("Error");
                else {
                    if (data.progreso !== undefined) {
                        message.progreso = data.progreso;
                        message.save();
                        console.log("Completado");
                        res.json(true);
                    } else {
                        res.json({progreso: message.progreso, estado: message.estado});
                        console.log("Completado");
                    }
                }
            });
        });

// Edita una orden con el id
router.route('/editar')
        // Modifica una orden
        .post(function (req, res) {
            console.log("Editar");

            Usuarios.findOne({_id: req.body.correo}, {}, function (err, user) {
                if (user !== null) {
                    Ordenes.findOne({_id: req.body._id}, function (err, message) {
                        if (err) {
                            res.send(err);
                        } else if (message !== null) {
                            //Si la orden ya está finalizada

                            if (req.body.estado === 0) {

                                message.estado = 0;
                                //Mueve la orden de carrito a historial
                                Usuarios.findOne({_id: req.body.correo}, {}, function (err, usuario) {
                                    var carrito = usuario.carrito;
                                    var historial = usuario.historial;
                                    carrito.splice(carrito.indexOf(req.body._id), 1);
                                    historial.push(req.body._id);
                                    usuario.carrito = carrito;
                                    usuario.historial = historial;
                                    usuario.save();
                                    message.save();
                                }).exec()
                                        //Se buscan todas las ordenes del usuario
                                        .then(function (orden) {
                                            var Promise = require('bluebird');
                                            var ForMangas = Promise.method(function (condition, action, value) {
                                                if (!condition(value))
                                                    return value;
                                                return action(value).then(ForMangas.bind(null, condition, action));
                                            });
                                            ForMangas(function (cuenta) {
                                                return cuenta < message.ingredientes.length;
                                            }, function (cuenta) {
                                                return Mangas.findOne({_id: message.ingredientes[cuenta]._idManga}, {__v: 0})
                                                        //Se restan reservados y disponibles en mangas
                                                        .then(function (manga) {
                                                            manga.reservado = manga.reservado - message.ingredientes[cuenta].pesoActual;
                                                            manga.disponible = manga.disponible - message.ingredientes[cuenta].pesoActual;
                                                            manga.save();
                                                            return ++cuenta;
                                                        });
                                            }
                                            , 0);

                                            //Se restan los vasos
                                            Vasos.findOne({nombre: message.vaso}, {__v: 0}, function (err, data) {
                                                data.reservados = data.reservados - 1;
                                                data.cantidad = data.cantidad - 1;
                                                data.save();
                                            });
                                        });
                                res.json(true);

                            }
                            //Confirmacion del usuario
                            else if (req.body.estado === 3) {
                                if (message.estado === 2) {
                                    message.estado = req.body.estado;
                                    message.save();
                                    res.json(true);
                                    console.log("Completado");
                                } else {
                                    res.json(false);
                                    console.log("Completado");
                                }
                            }
                            //Modifica el estado cuando no se ha terminado
                            else {
                                message.estado = req.body.estado;
                                message.save();
                                res.json(message);
                                console.log("Completado");
                            }
                        } else {
                            res.json(false);
                            console.log("Completado");
                        }
                    });
                } else {
                    res.json(false);
                    console.log("Completado");
                }
            });
        });

// Edita una orden con el id
router.route('/editarR')
        // Modifica una orden
        .post(function (req, res) {
            console.log("Editar");
            console.log(req.body.data);
            var data = JSON.parse(req.body.data);
            Usuarios.findOne({_id: data.correo}, {}, function (err, user) {
                if (user !== null) {

                    Ordenes.findOne({_id: data._id}, function (err, message) {
                        console.log(message);

                        if (err) {
                            res.send(err);
                        } else if (message !== null) {
                            //Si la orden ya está finalizada

                            if (req.body.estado === 0) {

                                message.estado = 0;
                                //Mueve la orden de carrito a historial
                                Usuarios.findOne({_id: data.correo}, {}, function (err, usuario) {
                                    var carrito = usuario.carrito;
                                    var historial = usuario.historial;
                                    carrito.splice(carrito.indexOf(data._id), 1);
                                    historial.push(data._id);
                                    usuario.carrito = carrito;
                                    usuario.historial = historial;
                                    usuario.save();
                                    message.save();
                                }).exec()
                                        //Se buscan todas las ordenes del usuario
                                        .then(function (orden) {
                                            var Promise = require('bluebird');
                                            var ForMangas = Promise.method(function (condition, action, value) {
                                                if (!condition(value))
                                                    return value;
                                                return action(value).then(ForMangas.bind(null, condition, action));
                                            });
                                            ForMangas(function (cuenta) {
                                                return cuenta < message.ingredientes.length;
                                            }, function (cuenta) {
                                                return Mangas.findOne({_id: message.ingredientes[cuenta]._idManga}, {__v: 0})
                                                        //Se restan reservados y disponibles en mangas
                                                        .then(function (manga) {
                                                            manga.reservado = manga.reservado - message.ingredientes[cuenta].pesoActual;
                                                            manga.disponible = manga.disponible - message.ingredientes[cuenta].pesoActual;
                                                            manga.save();
                                                            return ++cuenta;
                                                        });
                                            }
                                            , 0);

                                            //Se restan los vasos
                                            Vasos.findOne({nombre: message.vaso}, {__v: 0}, function (err, data) {
                                                data.reservados = data.reservados - 1;
                                                data.cantidad = data.cantidad - 1;
                                                data.save();
                                            });
                                        });
                                res.json(true);

                            }
                            //Confirmacion del usuario
                            else if (data.estado === 3) {
                                if (message.estado === 2) {
                                    message.estado = data.estado;
                                    message.save();
                                    res.json(true);
                                    console.log("Completado");
                                } else {
                                    res.json(false);
                                    console.log("Completado");
                                }
                            }
                            //Modifica el estado cuando no se ha terminado
                            else {
                                message.estado = data.estado;
                                message.save();
                                res.json(message);
                                console.log("Completado");
                            }
                        } else {
                            res.json(false);
                            console.log("Completado");
                        }
                    });
                } else {
                    res.json(false);
                    console.log("Completado");
                }
            });
        });


// Operaciones con id
router.route('/editarCarrito')
        // Modifica una orden
        .post(function (req, res) {
            console.log("EditarCarrito");
            Usuarios.findOne({_id: req.body.correo}, {}, function (err, user) {
                if (user !== null) {
                    var largo = user.carrito.length;
                    //Se buscan todas las ordenes del usuario
                    var Promise = require('bluebird');
                    var ForOrden = Promise.method(function (condition, action, value) {
                        if (!condition(value))
                            return value;
                        return action(value).then(ForOrden.bind(null, condition, action));
                    });
                    ForOrden(function (count) {
                        return count < largo;
                    }, function (count) {
                        return Ordenes.findOne({_id: user.carrito[largo - count - 1]}, {__v: 0})
                                //Se restan reservados y disponibles en mangas
                                .then(function (orden) {
                                    if (req.body.estado === "0") {
                                        orden.estado = 0;
                                        var carrito = user.carrito;
                                        var historial = user.historial;
                                        carrito.splice(carrito.indexOf(orden._id), 1);
                                        historial.push(orden._id);
                                        user.carrito = carrito;
                                        user.historial = historial;
                                        user.save();
                                        orden.save();
                                        var Promise = require('bluebird');
                                        var ForMangas = Promise.method(function (condition, action, value) {
                                            if (!condition(value))
                                                return value;
                                            return action(value).then(ForMangas.bind(null, condition, action));
                                        });
                                        ForMangas(function (cuenta) {
                                            return cuenta < orden.ingredientes.length;
                                        }, function (cuenta) {
                                            return Mangas.findOne({_id: orden.ingredientes[cuenta]._idManga}, {__v: 0})
                                                    //Se restan reservados y disponibles en mangas
                                                    .then(function (manga) {
                                                        manga.reservado = manga.reservado - orden.ingredientes[cuenta].pesoActual;
                                                        manga.disponible = manga.disponible - orden.ingredientes[cuenta].pesoActual;
                                                        manga.save();
                                                        return ++cuenta;
                                                    });
                                            return ++cuenta;
                                        }, 0);
                                        //Se restan los vasos
                                        Vasos.findOne({nombre: orden.vaso}, {__v: 0}, function (err, data) {
                                            data.reservados = data.reservados - 1;
                                            data.cantidad = data.cantidad - 1;
                                            data.save();
                                        });
                                    }
                                    //Va modificar el estado de todas las ordenes
                                    else {
                                        orden.estado = req.body.estado;
                                        orden.save();
                                    }
                                    return ++count;
                                });
                    }
                    , 0);
                }
                res.json(user.carrito);
            });

        });


router.route('/borrar')
        // Borra una orden
        .post(function (req, res) {
            console.log("Borrar");
            Usuarios.findOne({_id: req.body.correo}, function (err, usuario) {
                if (req.body.estado === 1) {
                    usuario.carrito.splice(usuario.carrito.indexOf(req.body._id), 1);
                    usuario.save();
                    Ordenes.findOne({_id: req.body._id}, function (err, orden) {
                        var Promise = require('bluebird');
                        var ForMangas = Promise.method(function (condition, action, value) {
                            if (!condition(value))
                                return value;
                            return action(value).then(ForMangas.bind(null, condition, action));
                        });
                        ForMangas(function (cuenta) {
                            return cuenta < orden.ingredientes.length;
                        }, function (cuenta) {
                            return Mangas.findOne({_id: orden.ingredientes[cuenta]._idManga}, {__v: 0})
                                    //Se restan reservados y disponibles en mangas
                                    .then(function (manga) {
                                        manga.producto[0].nombre;
                                        manga.reservado = manga.reservado - orden.ingredientes[cuenta].pesoActual;
                                        manga.save();
                                        return ++cuenta;
                                    });
                            return ++cuenta;
                        }, 0);
                        //Se restan los vasos
                        Vasos.findOne({nombre: orden.vaso}, {__v: 0}, function (err, data) {
                            data.reservados = data.reservados - 1;
                            data.save();
                        });
                    }).exec()
                            .then(function (err) {
                                Ordenes.remove({_id: req.body._id
                                }, function (err) {
                                    if (err) {
                                        console.log("Error");
                                    } else {
                                        console.log("Completado");
                                    }
                                });
                            });
                    res.json(true);
                    console.log("Completado");
                } else {
                    usuario.historial.splice(usuario.historial.indexOf(req.body._id), 1);
                    usuario.save();
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