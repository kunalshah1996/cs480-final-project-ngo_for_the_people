const db = require("../models");
const Fund = db.fund;
const Op = db.Sequelize.Op;


// Create and Save a new Fund
exports.create = (req, res) => {
  console.log("in controller")
      console.log(req.body)
    if (!req.body.fund_donation_id) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      

      // Create an Fund
      const fund = {
        fund_donation_id: req.body.fund_donation_id,
        fund_donor_id: req.body.fund_donor_id,
        fund_amount: req.body.fund_amount,
        fund_status: req.body.fund_status,

      };
    
      // Save Fund in the database
      Fund.create(fund)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating fund."
          });
        });
};

// Retrieve all Funds from the database.
exports.findAll = (req, res) => {
    const fund_donation_id = req.query.fund_id;
    var condition = fund_donation_id ? { fund_donation_id: { [Op.like]: `%${fund_donation_id}%` } } : null;
    console.log(`condition`, condition)
    Fund.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving fund(s)."
        });
      });
  };

// Find a single Funds with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Fund.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find fund with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving fund with id=" + id
        });
      });
  };

// Update an Fund by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Fund.update(req.body, {
      where: { fund_donation_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Fund was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update fund with id=${id}. Maybe fund was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating fund with id=" + id
        });
      });
  };

// Delete an Fund with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Fund.destroy({
      where: { fund_donation_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Fund was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete fund with id=${id}. Maybe fund was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete fund with id=" + id
        });
      });
  };
