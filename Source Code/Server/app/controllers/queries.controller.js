const db = require("../models");
// const Health = db.health;
const Op = db.Sequelize.Op;
var mysql = require('mysql2');
var fs = require('fs');
var readline = require('readline');

var myCon = mysql.createConnection({
    host: 'localhost',
    database: 'ngo_for_the_people',
    user: 'ngo_for_the_people',
    password: 'ask'
 });
exports.employees_education = (req, res) => {
     myCon.connect(function(err) {
        if (err) throw err;
        myCon.query("select * from Employed_for_Education", function (err, result, fields) 
        {
          if (result) {
            res.send({
              result
            });
          } else {
            res.send({
              message: `Cannot update Employee with. Maybe Employee was not found or req.body is empty!`
            });
          }
        });
      });
};

exports.incomplete_donation= (req, res) => {
     myCon.connect(function(err) {
        if (err) throw err;
        myCon.query("Select * from incomplete_donation", function (err, result, fields) {
            if (result) {
                res.send({
                  result
                });
              } else {
                res.send({
                  message: `Cannot update Employee with. Maybe Employee was not found or req.body is empty!`
                });
              }
        });
      });
};

exports.free_employees= (req, res) => {
    myCon.connect(function(err) {
       if (err) throw err;
       myCon.query("Select * from free_employees", function (err, result, fields) {
        if (result) {
            res.send({
              result
            });
          } else {
            res.send({
              message: `Cannot update Employee with. Maybe Employee was not found or req.body is empty!`
            });
          }
       });
     });
};

exports.donation_quantity= (req, res) => {
    myCon.connect(function(err) {
       if (err) throw err;
       myCon.query("Select * from donation_quantity", function (err, result, fields) {
        if (result) {
            res.send({
              result
            });
          } else {
            res.send({
              message: `Cannot update Employee with. Maybe Employee was not found or req.body is empty!`
            });
          }
       });
     });
};

exports.budget_city = (req, res) => {
  myCon.connect(function(err) {
     if (err) throw err;
     const city =req.query.city;
     console.log(city);
     myCon.query("SELECT SUM(campaign_budget) as TOTAL_BUDGET FROM campaign WHERE campaign_location = ?;",[city], function (err, result) 
     {
       if (result) {
         res.send({
           result
         });
       } else {
         res.send({
           message: `Cannot update Employee with. Maybe Employee was not found or req.body is empty!`
         });
       }
     });
   });
};

exports.allocated_funds= (req, res) => {
  myCon.connect(function(err) {
     if (err) throw err;
     myCon.query("SELECT SUM(fund_amount) as TOTAL_FUNDS_COLLECTED FROM fund WHERE fund_status = 'Allocated';", function (err, result, fields) {
      if (result) {
          res.send({
            result
          });
        } else {
          res.send({
            message: `Cannot update Employee with. Maybe Employee was not found or req.body is empty!`
          });
        }
     });
   });
};
