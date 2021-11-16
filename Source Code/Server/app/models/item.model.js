module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
      donation_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      item_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      item_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      item_status: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      timestamps:false
    })
    return Item;
  };