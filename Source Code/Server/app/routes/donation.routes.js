module.exports = app => {
    const donations = require("../controllers/donation.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Employee
    router.post("/", donations.create);
  
    // Retrieve all Employees
    router.get("/", donations.findAll);
  
    // Retrieve a single Employee with id
    router.get("/:id", donations.findOne);
  
    // Update an Employee with id
    router.put("/:id", donations.update);
  
    // Delete an Employee with id
    router.delete("/:id", donations.delete);
  
    app.use('/api/donations', router);
  };