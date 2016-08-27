/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect('mongodb://127.0.0.1:27017/Foseto', function (err, db) {
            if (err) {
                throw err;
            } else {
                console.log("successfully connected to the database");
            }
            db.close();
        });
