module.exports = (sequelize, Sequelize) => {
    const Donation = sequelize.define("donation", {
      donation_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      donation_donor_id: {
        type: Sequelize.INTEGER
      },
      donation_type: {
        type: Sequelize.STRING
      },
      donation_status: {
        type: Sequelize.STRING
      }
    },
    {
      freezeTableName: true,
      timestamps:false
    })
    return Donation;
  };