
const Employee = require("./employee.model");
module.exports = (sequelize, Sequelize) => {
    const Campaign = sequelize.define("campaign", {
      campaign_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      campaign_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      campaign_details: {
        type: Sequelize.INTEGER
      },
      campaign_location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      campaign_employee_id: {
        type: Sequelize.INTEGER,
      },
      campaign_budget: {
        type: Sequelize.INTEGER,
        allowNull:false
      }
    },
    {
      freezeTableName: true,
      timestamps:false
    })
    return Campaign;
  };