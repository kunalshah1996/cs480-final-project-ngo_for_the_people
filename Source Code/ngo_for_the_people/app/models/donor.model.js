module.exports = (sequelize, Sequelize) => {
  const Donor = sequelize.define("donor", {
    donor_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    donor_ssn: {
      type: Sequelize.STRING
    },
    donor_name: {
      type: Sequelize.STRING
    },
    donor_contact: {
      type: Sequelize.INTEGER
    }
  },
  {
    freezeTableName: true,
    timestamps:false
  })
  return Donor;
};