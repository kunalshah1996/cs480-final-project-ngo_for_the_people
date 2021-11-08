const db = require("../models");
const Item = db.item;
const Op = db.Sequelize.Op;

// Create and Save a new item
exports.create = (req, res) => {
    if (!req.body.donation_id) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create an item
      const item = {
        donation_id: req.body.donation_id,
        item_type: req.body.item_type,
        item_quantity: req.body.item_quantity,
        item_status: req.body.item_status
      };
    
      // Save Item in the database
      Item.create(item)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating item."
          });
        });
};

// Retrieve all items from the database.
exports.findAll = (req, res) => {
    const donation_id = req.query.donation_id;
    var condition = donation_id ? { donation_id: { [Op.like]: `%${donation_id}%` } } : null;
    console.log(`condition`, condition)
    Item.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving items."
        });
      });
  };

// Find a single item with an donation id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Item.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Item with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Item with id=" + id
        });
      });
  };

// Update an Item by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Item.update(req.body, {
      where: { donation_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Item was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Item with id=" + id
        });
      });
  };

// Delete an Item with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Item.destroy({
      where: { donation_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Item was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Item with id=" + id
        });
      });
  };
