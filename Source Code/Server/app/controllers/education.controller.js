const db = require("../models");
const Education = db.education;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    console.log("entered exports create")
    if (!req.body.cause_id) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      
      const education = {
        cause_id: req.body.cause_id,
        institution_name: req.body.institution_name,
        need_type: req.body.need_type,
        need_quantity: req.body.need_quantity,
        poc_name: req.body.poc_name,
        poc_contact: req.body.poc_contact,
        
      };
    
      
      Education.create(education)
        .then(data => {
          res.send(data);
          console.log(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating a education cause."
          });
        });
};


exports.findAll = (req, res) => {
    const cause_id = req.query.cause_id;
    console.log('in findall',req.query.cause_id)
    var condition = cause_id ? { cause_id: { [Op.like]: `%${cause_id}%` } } : null;
    console.log(`condition`, condition)
    Education.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving a cause."
        });
      });
  };


exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Education.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find a cause with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving a cause with id=" + id
        });
      });
  };


exports.update = (req, res) => {
    const id = req.params.id;
  
    Education.update(req.body, {
      where: { cause_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "The cause was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Education with id=${id}. Maybe Cause was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Education with id=" + id
        });
      });
  };


exports.delete = (req, res) => {
    const id = req.params.id;
  
    Education.destroy({
      where: { cause_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Education cause was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete the cause with id=${id}. Maybe cause was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete cause with id=" + id
        });
      });
  };
