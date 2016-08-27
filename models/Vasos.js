
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var vasoSchema   = new Schema({
    nombre: { type: String },
    cantidad: { type: Number },
    capacidad: {type: Number},
    reservados: {type: Number},
    foto: { type: String }
    });
 
module.exports = mongoose.model('Vasos', vasoSchema);