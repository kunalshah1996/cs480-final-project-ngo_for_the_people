module.exports = app => {
    const healths = require("../controllers/health.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Employee
    router.post("/", healths.create);
  
    // Retrieve all Employees
    router.get("/", healths.findAll);
  
    // Retrieve a single Employee with id
    router.get("/:id", healths.findOne);
  
    // Update an Employee with id
    router.put("/:id", healths.update);
  
    // Delete an Employee with id
    router.delete("/:id", healths.delete);
  
    app.use('/api/healths', router);
  };