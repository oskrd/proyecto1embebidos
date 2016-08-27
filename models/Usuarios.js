
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var usersSchema   = new Schema({
    nombre: {type: String},
    _id: {type: String, unique: true },
    password: { type: String },
    fechaNac: { type: Date },
    fechaReg: { type: Date},
    foto: { type: String },
    historial: {type: Array},
    carrito: {type: Array}
    });
 
module.exports = mongoose.model('Usuarios', usersSchema);