const Users = require('./Users')

module.exports = (sequelize, DataTypes) => {
  const Operations = sequelize.define(
    'Operations',
    {
      operationId: {
        type: DataTypes.INTEGER,
        setDefaultValue: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      concept: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: true,
    }
  )
  Operations.associate = models => {
    Operations.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    })
  }
  return Operations
}
