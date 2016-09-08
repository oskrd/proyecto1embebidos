var express = require('express');
var spawn = require('child_process').spawn;
var router = express.Router();

spawn('gpio', ["pinMode", "2", "INPUT", "0"]);
spawn('gpio', ["pinMode", "3", "INPUT", "0"]);
spawn('gpio', ["pinMode", "4", "INPUT", "0"]);
spawn('gpio', ["pinMode", "17", "INPUT", "0"]);


// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de puertas recibida: ', dateDisplayed(Date.now()));
    next();
});

//Obtiene los datos de puertas
router.route('/')
        .get(function (req, res) {
            
            run("2", function(p1){
            run("3", function(p2){
            run("4",function(p3){
            run("17",function(p4){        
                res.send([parseInt(p1),parseInt(p2),
                    parseInt(p3),parseInt(p4)]);
            });
            });
            });
            });
        });

module.exports = router;

function run(pin, callback) {
    var command = spawn('gpio', ["digitalRead", pin, "", ""]);
    var result = '';
    command.stdout.on('data', function(data) {
         result += data.toString();
    });
    command.on('close', function(code) {
        return callback(result);
    });
}

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}