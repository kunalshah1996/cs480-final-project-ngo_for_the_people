const db = require("../models");
// const Health = db.health;
const Op = db.Sequelize.Op;
var mysql = require('mysql2');
var fs = require('fs');
var readline = require('readline');


exports.start = (req, res) => {
    var myCon = mysql.createConnection({
        host: 'localhost',
        database: 'ngo_for_the_people',
        user: 'ngo_for_the_people',
        password: 'ask'
     });
    console.log("entered initialize db")
    var rl = readline.createInterface({
        input: fs.createReadStream("../../sql/initializeDB.sql"),
        terminal: false
       });
    rl.on('line', function(chunk){
        myCon.query(chunk.toString('ascii'), function(err, sets, fields){
            if (sets) {
                res.send({
                  sets
                });
              } else {
                res.send({
                  message: `Cannot update Employee with. Maybe Employee was not found or req.body is empty!`
                });
              }
        });
    });
    rl.on('close', function(){
        console.log("finished");
        myCon.end();
      });
       
};