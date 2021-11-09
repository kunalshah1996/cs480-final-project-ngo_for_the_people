module.exports = app => {
    const funds = require("../controllers/fund.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Employee
    router.post("/", funds.create);
  
    // Retrieve all Employees
    router.get("/", funds.findAll);
  
    // Retrieve a single Employee with id
    router.get("/:id", funds.findOne);
  
    // Update an Employee with id
    router.put("/:id", funds.update);
  
    // Delete an Employee with id
    router.delete("/:id", funds.delete);
  
    app.use('/api/funds', router);
  };