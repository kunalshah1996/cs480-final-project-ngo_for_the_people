const db = require("../models");
const Receiver = db.receiver;
const Op = db.Sequelize.Op;

// Create and Save a new Receiver
exports.create = (req, res) => {
    if (!req.body.cause_id) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create a Receiver
      const receiver = {
        cause_id: req.body.cause_id,
        receiver_ssn: req.body.receiver_ssn,
        receiver_name: req.body.receiver_name,
        receiver_contact: req.body.receiver_contact,
        receiver_income: req.body.receiver_income,
        receiver_family: req.body.receiver_family,
        receiver_location: req.body.receiver_location
      };
    
      // Save Receiver in the database
      Receiver.create(receiver)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating receiver."
          });
        });
};

// Retrieve all Receiver from the database.
exports.findAll = (req, res) => {
    const cause_id = req.query.receiver_id;
    console.log("findall",req.query)
    var condition = cause_id ? { cause_id: { [Op.like]: `%${cause_id}%` } } : null;
    console.log(`condition`, condition)
    Receiver.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving receivers."
        });
      });
  };

// Find a single receiver with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id)
    Receiver.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Receiver with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Receiver with id=" + id
        });
      });
  };

// Update an Receiver by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Receiver.update(req.body, {
      where: { cause_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Receiver was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Receiver with id=${id}. Maybe receiver was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating receiver with id=" + id
        });
      });
  };

// Delete an Receiver with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Receiver.destroy({
      where: { cause_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Receiver was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Receiver with id=${id}. Maybe Receiver was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Receiver with id=" + id
        });
      });
  };
