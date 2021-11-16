module.exports = app => {
    const receivers = require("../controllers/receiver.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Receiver
    router.post("/", receivers.create);
  
    // Retrieve all Receiver
    router.get("/", receivers.findAll);
  
    // Retrieve a single Receiver with id
    router.get("/:id", receivers.findOne);
  
    // Update an Receiver with id
    router.put("/:id", receivers.update);
  
    // Delete Receiver with id
    router.delete("/:id", receivers.delete);
  
    app.use('/api/receivers', router);
  };