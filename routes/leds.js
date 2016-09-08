var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn;

spawn("gpio", ["pinMode", "5", "OUTPUT", "0"]);
spawn("gpio", ["pinMode", "6", "OUTPUT", "0"]);
spawn("gpio", ["pinMode", "13", "OUTPUT", "0"]);
spawn("gpio", ["pinMode", "19", "OUTPUT", "0"]);
spawn("gpio", ["pinMode", "26", "OUTPUT", "0"]);

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
    console.log('Peticion de leds recibida: ', dateDisplayed(Date.now()));
    next();
});

router.route('/')
        .post(function (req, res) {
            spawn('gpio', ["digitalWrite", req.body.num, "", req.body.valor]);
            res.send(true);
        })

        .get(function (req, res) {
            run("5", function(led1){
            run("6", function(led2){
            run("13",function(led3){
            run("19",function(led4){        
            run("26",function(led5){    
                res.send([parseInt(led1),parseInt(led2),
                    parseInt(led3),parseInt(led4),parseInt(led5)]);
            });
            });
            });
            });
            });
        });

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

module.exports = router;
function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}