
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var comboSchema   = new Schema({
    foto: { type: String },
    nombre: {type: String},
    vaso: {type: String},
    ingredientes:{type: Array},
    descripcion: {type: String},
    precio: { type: Number}
    });
 
module.exports = mongoose.model('Combos', comboSchema);