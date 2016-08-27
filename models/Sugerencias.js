
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var sugSchema   = new Schema({
    nombre: {type: String},
    correo: {type: String},
    asunto: {type: String},
    comentario: {type: String}
    });
 
module.exports = mongoose.model('Sugerencias', sugSchema);