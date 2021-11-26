module.exports = app => {
    const queries = require("../controllers/queries.controller");
  
    var router = require("express").Router();
  
    router.get("/employees_education", queries.employees_education);
    router.get("/incomplete_donation", queries.incomplete_donation);
    router.get("/free_employees", queries.free_employees);
    router.get("/donation_quantity", queries.donation_quantity);
    router.get("/budget_city", queries.budget_city);
    router.get("/allocated_funds",queries.allocated_funds);

    app.use('/api/queries', router);
  };