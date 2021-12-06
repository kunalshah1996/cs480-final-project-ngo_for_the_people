const db = require("../models");
const Cause = db.cause;
const Op = db.Sequelize.Op;

// Create and Save a new cause
exports.create = (req, res) => {
    if (!req.body.cause_id) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      
      const cause = {
        cause_id: req.body.cause_id,
        cause_type: req.body.cause_type,
        cause_status: req.body.cause_status,
        approver_id: req.body.approver_id,
       
      };
    
      // Save cause in the database
      Cause.create(cause)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating a cause."
          });
        });
};

// Retrieve all causes from the database.
exports.findAll = (req, res) => {
    const cause_id = req.query.cause_id;
    var condition = cause_id ? { cause_id: { [Op.like]: `%${cause_id}%` } } : null;
    console.log(`condition`, condition)
    Cause.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving a cause"
        });
      });
  };

// Find a single cause with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id);
    console.log("IN find one")
    Cause.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
          console.log("in find pk",data)
        } else {
          res.status(404).send({
            message: `Cannot find cause with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving cause with id=" + id
        });
      });
  };

// Update a cause by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Cause.update(req.body, {
      where: { cause_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Cause was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Cause with id=${id}. Maybe the cause was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Cause with id=" + id
        });
      });
  };

// Delete a cause with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Cause.destroy({
      where: { cause_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Cause was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Cause with id=${id}. Maybe Cause was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Cause with id=" + id
        });
      });
  };
