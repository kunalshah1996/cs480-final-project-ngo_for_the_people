const db = require("../models");
const Donation = db.donation;
const Op = db.Sequelize.Op;


// Create and Save a new Donation
exports.create = (req, res) => {
    if (!req.body.donation_id) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create an Donation
      const donation = {
        donation_id: req.body.donation_id,
        donation_donor_id: req.body.donation_donor_id,
        donation_type: req.body.donation_type,
        donation_status: req.body.donation_status,

      };
    
      // Save Donation in the database
      Donation.create(donation)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating donation."
          });
        });
};

// Retrieve all Donations from the database.
exports.findAll = (req, res) => {
    const donation_id = req.query.donation_id;
    var condition = donation_id ? { donation_id: { [Op.like]: `%${donation_id}%` } } : null;
    console.log(`condition`, condition)
    Donation.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving donation(s)."
        });
      });
  };

// Find a single Donations with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Donation.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find donation with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving donation with id=" + id
        });
      });
  };

// Update an Donation by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Donation.update(req.body, {
      where: { donation_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Donation was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update donation with id=${id}. Maybe donation was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating donation with id=" + id
        });
      });
  };

// Delete an Donation with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Donation.destroy({
      where: { donation_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Donation was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete donation with id=${id}. Maybe donation was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete donation with id=" + id
        });
      });
  };
