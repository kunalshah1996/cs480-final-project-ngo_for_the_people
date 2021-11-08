module.exports = app => {
    const donors = require("../controllers/donor.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Employee
    router.post("/", donors.create);
  
    // Retrieve all Employees
    router.get("/", donors.findAll);
  
    // Retrieve a single Employee with id
    router.get("/:id", donors.findOne);
  
    // Update an Employee with id
    router.put("/:id", donors.update);
  
    // Delete an Employee with id
    router.delete("/:id", donors.delete);
  
    app.use('/api/donors', router);
  };