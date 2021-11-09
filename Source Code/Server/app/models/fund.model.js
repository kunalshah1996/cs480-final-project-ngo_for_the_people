module.exports = (sequelize, Sequelize) => {
    const Fund = sequelize.define("fund", {
      fund_donation_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      fund_donor_id: {
        type: Sequelize.INTEGER
      },
      fund_amount: {
        type: Sequelize.INTEGER
      },
      fund_status: {
        type: Sequelize.STRING
      }
    },
    {
      freezeTableName: true,
      timestamps:false
    })
    return Fund;
  };