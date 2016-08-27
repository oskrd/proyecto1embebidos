
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var orderSchema   = new Schema({
    _id: { type: String },
    fecha: { type: Date },
    precio: { type: Number },
    vaso: {type: String},
    peso: { type: Number},
    estado: {type: Number},
    progreso: {type: Number},
    ingredientes: {type: Array},
    foto: {type: String}
    });
 
module.exports = mongoose.model('Ordenes', orderSchema);