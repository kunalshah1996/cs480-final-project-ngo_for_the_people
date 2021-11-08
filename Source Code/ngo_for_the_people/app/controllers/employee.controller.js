const db = require("../models");
const Employee = db.employees;
const Op = db.Sequelize.Op;

// Create and Save a new Employee
exports.create = (req, res) => {
    if (!req.body.employee_id) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create an Employee
      const employee = {
        employee_id: req.body.employee_id,
        employee_name: req.body.employee_name,
        employee_contact: req.body.employee_contact,
        employee_address: req.body.employee_address,
        employee_designation: req.body.employee_designation,
        employee_department: req.body.employee_department,
        employee_availability: req.body.employee_availability
      };
    
      // Save Employee in the database
      Employee.create(employee)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating employee."
          });
        });
};

// Retrieve all Employees from the database.
exports.findAll = (req, res) => {
    const employee_id = req.query.employee_id;
    var condition = employee_id ? { employee_id: { [Op.like]: `%${employee_id}%` } } : null;
    console.log(`condition`, condition)
    Employee.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving employees."
        });
      });
  };

// Find a single Employee with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Employee.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Employee with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving employee with id=" + id
        });
      });
  };

// Update an Employee by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Employee.update(req.body, {
      where: { employee_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Employee was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Employee with id=" + id
        });
      });
  };

// Delete an Employee with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Employee.destroy({
      where: { employee_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Employee was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Employee with id=" + id
        });
      });
  };
