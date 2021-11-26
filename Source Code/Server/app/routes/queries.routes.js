module.exports = app => {
    const queries = require("../controllers/queries.controller");
  
    var router = require("express").Router();
  
    router.get("/employees_education", queries.employees_education);
    router.get("/incomplete_donation", queries.incomplete_donation);
    router.get("/free_employees", queries.free_employees);
    router.get("/donation_quantity", queries.donation_quantity);
    router.get("/budget_city", queries.budget_city);
    router.get("/allocated_funds",queries.allocated_funds);
    router.get("/budget_online",queries.budget_online);
    router.get("/active_causes",queries.active_causes);
    router.get("/designation_pr",queries.designation_pr);
    router.get("/trim_ename",queries.trim_ename);
    router.get("/joining_period",queries.joining_period);
    router.get("/count_donation",queries.count_donation);
    



    app.use('/api/queries', router);
  };