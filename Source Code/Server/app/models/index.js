const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD, 
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employees = require("./employee.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.campaign = require("../models/campaign.model.js")(sequelize, Sequelize);
db.receiver = require("../models/receiver.model.js")(sequelize, Sequelize);
db.item = require("../models/item.model.js")(sequelize, Sequelize);
db.donor = require("../models/donor.model.js")(sequelize, Sequelize);
db.cause = require("../models/cause.model.js")(sequelize, Sequelize);
db.education = require("../models/education.model.js")(sequelize, Sequelize);
db.health = require("../models/health.model.js")(sequelize, Sequelize);
db.donation = require("../models/donation.model.js")(sequelize, Sequelize);
db.fund = require("../models/fund.model.js")(sequelize, Sequelize);


module.exports = db;