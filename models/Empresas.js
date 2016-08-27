
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var empresaSchema   = new Schema({
    _id: {type: String},
    mision: {type: String},
    vision: {type: String},
    quesomos: {type: String},
    ubicacion: {type: String},
    telefono: {type: String},
    mapa: { type: String},
    email: {type: String}
    });
 
module.exports = mongoose.model('Empresas', empresaSchema);