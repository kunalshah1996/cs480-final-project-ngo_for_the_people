module.exports = (sequelize, Sequelize) => {
    const Health = sequelize.define("health", {
      cause_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      org_name: {
        type: Sequelize.STRING
      },
      need_type: {
        type: Sequelize.STRING
      },
      need_quantity: {
        type: Sequelize.INTEGER
      },
      poc_name: {
        type: Sequelize.STRING
      },
      poc_contact: {
        type: Sequelize.INTEGER
      }
     
    },
    {
      freezeTableName: true,
      timestamps:false
    })
    return Health;
  };