module.exports = app => {
    const campaigns = require("../controllers/campaign.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Campaign
    router.post("/", campaigns.create);
  
    // Retrieve all Campaign
    router.get("/", campaigns.findAll);
  
    // Retrieve a single Campaign with id
    router.get("/:id", campaigns.findOne);
  
    // Update an Campaign with id
    router.put("/:id", campaigns.update);
  
    // Delete an Campaign with id
    router.delete("/:id", campaigns.delete);
  
    app.use('/api/campaigns', router);
  };