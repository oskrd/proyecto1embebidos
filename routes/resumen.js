var express = require('express');
var router = express.Router();

var Comentarios = require('../models/Comentarios');
var Usuarios = require('../models/Usuarios');
var Ordenes = require('../models/Ordenes');

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de Combo recibida: ', dateDisplayed(Date.now()));
    next();
});

router.route('/')
        .get(function (req, res) {
            console.log("Resumen");
            var lista = {comentarios: 0, ganancias: 0, usuarios: 0, ordenAct: 0, ordenFin: 0, valoracion: 0};
            Ordenes.aggregate({$group: {_id: null, total: {$sum: "$precio"}}}).exec()
                    .then(function (data) {
                        lista.ganancias = data[0].total;
                        return Comentarios.count();
                    });
            Comentarios.aggregate([{$group: {_id: null, promedio: {$avg: "$valoracion"}}}]).exec()
                    .then(function (data) {
                        lista.valoracion = parseFloat(data[0].promedio.toFixed(2));
                        return Comentarios.count();
                    });
            Usuarios.count().exec()
                    .then(function (data) {
                        lista.usuarios = data;
                        return Comentarios.count();
                    })
                    .then(function (data) {
                        lista.comentarios = data;
                        return Ordenes.count({estado: 0});
                    })
                    .then(function (data) {
                        lista.ordenFin = data;
                        return Ordenes.count({estado: { $gt: 0 }});
                    })
                    .then(function (data) {
                        lista.ordenAct = data;
                        res.json(lista);
                        console.log("Completado");
                    });
        });

module.exports = router;

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}