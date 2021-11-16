module.exports = (sequelize, Sequelize) => {
    const Receiver = sequelize.define("receiver", {
      cause_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      receiver_ssn: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      receiver_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      receiver_contact: {
        type: Sequelize.STRING,
        allowNull: false
      },
      receiver_income: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      receiver_family: {
        type: Sequelize.STRING,
        allowNull: false
      },
      receiver_location: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      timestamps:false
    })
    return Receiver;
  };