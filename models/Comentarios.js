
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var comentSchema   = new Schema({
    nombre: {type: String, required: true},
    foto: {type: String},
    comentario: {type: String},
    valoracion: {type: Number}
    });
 
module.exports = mongoose.model('Comentarios', comentSchema);