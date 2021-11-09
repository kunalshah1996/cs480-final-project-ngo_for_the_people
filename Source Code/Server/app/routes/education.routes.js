module.exports = app => {
    const educations = require("../controllers/education.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Employee
    router.post("/", educations.create);
  
    // Retrieve all Employees
    router.get("/", educations.findAll);
  
    // Retrieve a single Employee with id
    router.get("/:id", educations.findOne);
  
    // Update an Employee with id
    router.put("/:id", educations.update);
  
    // Delete an Employee with id
    router.delete("/:id", educations.delete);
  
    app.use('/api/educations', router);
  };