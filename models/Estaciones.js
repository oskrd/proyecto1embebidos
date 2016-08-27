
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var estacSchema   = new Schema({
    nombre: {type: String},
    precio: { type: Number},
    tamano: {type: Array},
    mangas: {type: Array},
    color: {type: String},
    fondo: {type: Number},
    tipo: {type: Number}
});
 
module.exports = mongoose.model('Estaciones', estacSchema);