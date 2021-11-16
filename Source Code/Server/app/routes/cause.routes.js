module.exports = app => {
    const causes = require("../controllers/cause.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Employee
    router.post("/", causes.create);
  
    // Retrieve all Employees
    router.get("/", causes.findAll);
  
    // Retrieve a single Employee with id
    router.get("/:id", causes.findOne);
  
    // Update an Employee with id
    router.put("/:id", causes.update);
  
    // Delete an Employee with id
 router.delete("/:id", causes.delete);
  
    app.use('/api/causes', router);
  };