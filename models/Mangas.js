
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mangaSchema = new Schema({
    //Datos de producto
    producto: {type: Array},
    reservado: {type: Number},
    disponible: {type: Number},
    
    //Datos de la manga
    capacidad: {type: Number}               
    
});

module.exports = mongoose.model('Mangas', mangaSchema);