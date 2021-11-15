module.exports = app => {
    const initializedb = require("../controllers/initializedb.controller");
  
    var router = require("express").Router();
  
    // Retrieve all Employees
    router.get("/", initializedb.start);
  
    app.use('/api/initializedb', router);
  };