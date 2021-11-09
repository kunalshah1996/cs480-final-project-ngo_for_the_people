module.exports = (sequelize, Sequelize) => {
    const Education = sequelize.define("education", {
      cause_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      institution_name: {
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
    return Education;
  };