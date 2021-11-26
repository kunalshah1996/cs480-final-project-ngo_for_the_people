module.exports = app => {
    const initializedb = require("../controllers/initializedb.controller");
  
    var router = require("express").Router();
  
    router.get("/", initializedb.start);
  
    app.use('/api/initializedb', router);
  };