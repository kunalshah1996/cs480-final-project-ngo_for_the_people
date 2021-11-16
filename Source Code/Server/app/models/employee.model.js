module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
      employee_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      employee_name: {
        type: Sequelize.STRING
      },
      employee_contact: {
        type: Sequelize.INTEGER
      },
      employee_address: {
        type: Sequelize.STRING
      },
      employee_designation: {
        type: Sequelize.STRING
      },
      employee_department: {
        type: Sequelize.STRING
      },
      employee_availability: {
        type: Sequelize.STRING
      }
    },
    {
      freezeTableName: true,
      timestamps:false
    })
    return Employee;
  };