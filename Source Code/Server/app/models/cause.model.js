

module.exports = (sequelize, Sequelize) => {
    const Cause = sequelize.define("cause", {
      cause_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      cause_type: {
        type: Sequelize.STRING
      },
      cause_status: {
        type: Sequelize.STRING
      },
      approver_id: {
        type: Sequelize.STRING
        // references: {
        //     model : employeeModel,
        //     key :  'employee_id'
      //}

      }
      
    },
    {
      freezeTableName: true,
      timestamps:false
    })
    return Cause;
  };