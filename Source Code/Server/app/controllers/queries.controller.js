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
              message: `Cannot retrieve Employees.`
            });
          }
       });
     });
};

exports.donation_quantity= (req, res) => {
  myCon.connect(function(err) {
     if (err) throw err;
     myCon.query("select count(*) as TOTAL_DONATIONS_AVAILABLE from donor d inner join donation do on d.donor_id=do.donation_donor_id where donation_status ='Received';", function (err, result, fields) {
      if (result) {
          res.send({
            result
          });
        } else {
          res.send({
            message: `Cannot retrieve data`
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
           message: `Cannot retrieve data`
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
            message: `Cannot retrieve data`
          });
        }
     });
   });
};


exports.active_causes= (req, res) => {
  myCon.connect(function(err) {
     if (err) throw err;
     myCon.query("SELECT cause_type, cause_id FROM cause WHERE  cause_status = 'active';", function (err, result, fields) {
      if (result) {
          res.send({
            result
          });
        } else {
          res.send({
            message: `Cannot retrieve causes!`
          });
        }
     });
   });
};

exports.budget_online= (req, res) => {
  myCon.connect(function(err) {
     if (err) throw err;
     myCon.query("SELECT campaign_id, campaign_budget FROM campaign WHERE campaign_location = 'Online';", function (err, result, fields) {
  
      if (result) {
          res.send({
            result
          });
        } else {
          res.send({
            message: `Cannot retrieve budget!`
          });
        }
     });
   });
};


exports.designation_pr= (req, res) => {
  myCon.connect(function(err) {
     if (err) throw err;
     myCon.query("SELECT employee_id, employee_designation FROM employee WHERE employee_department = 'Public Relations';", function (err, result, fields) {
      if (result) {
          res.send({
            result
          });
        } else {
          res.send({
            message: `Cannot retrieve employees!`
          });
        }
     });
   });
};


exports.trim_ename = (req, res) => {
  myCon.connect(function(err) {
     if (err) throw err;
     myCon.query("UPDATE employee SET employee_name = TRIM(employee_name);", function (err, result, fields) {
      if (result) {
        console.log(result.changedRows)
          res.send({
            result
          });
        } else {
          res.send({
            message: `Cannot retrieve employee names!`
          });
        }
     });
   });
};


exports.count_donation = (req, res) => {
  myCon.connect(function(err) {
     if (err) throw err;
     const countvalue =req.query.countvalue;
     myCon.query("SELECT SUM(i.item_quantity) as TOTAL_COUNT, d.donation_type FROM donation d inner join item i on d.donation_id=i.donation_id where d.donation_type!='Fund' GROUP BY donation_type having TOTAL_COUNT>?;",[countvalue],function (err, result, fields) {
      if (result) {
          res.send({
            result
          });
        } else {
          res.send({
            message: `No records satisfy given condition!`
          });
        }
     });
   });
};

exports.joining_period = (req, res) => {
  myCon.connect(function(err) {
     if (err) throw err;
     const date1 =req.query.date1;
     const date2 =req.query.date2;
     myCon.query("SELECT employee_name, employee_id, employee_doj FROM employee WHERE employee_doj >= ? AND employee_doj < ?;",[date1,date2],function (err, result, fields) {
      if (result) {
          res.send({
            result
          });
        } else {
          res.send({
            message: `No records satisfy given condition!`
          });
        }
     });
   });
};
