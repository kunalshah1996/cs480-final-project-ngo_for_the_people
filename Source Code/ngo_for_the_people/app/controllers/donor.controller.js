const db = require("../models");
const Donor = db.donor;
const Op = db.Sequelize.Op;


// Create and Save a new Donor
exports.create = (req, res) => {
    if (!req.body.donor_id) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create an Donor
      const donor = {
        donor_id: req.body.donor_id,
        donor_ssn: req.body.donor_ssn,
        donor_name: req.body.donor_name,
        donor_contact: req.body.donor_contact,

      };
    
      // Save Donor in the database
      Donor.create(donor)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating donor."
          });
        });
};

// Retrieve all Donors from the database.
exports.findAll = (req, res) => {
    const donor_id = req.query.donor_id;
    var condition = donor_id ? { donor_id: { [Op.like]: `%${donor_id}%` } } : null;
    console.log(`condition`, condition)
    Donor.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving donor(s)."
        });
      });
  };

// Find a single Donors with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Donor.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find donor with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving donor with id=" + id
        });
      });
  };

// Update an Donor by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Donor.update(req.body, {
      where: { donor_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Donor was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Donor with id=${id}. Maybe donor was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Donor with id=" + id
        });
      });
  };

// Delete an Donor with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Donor.destroy({
      where: { donor_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Donor was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete donor with id=${id}. Maybe Donor was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Donor with id=" + id
        });
      });
  };
