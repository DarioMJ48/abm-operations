const Operations = require('./Operations')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      userId: {
        type: DataTypes.INTEGER,
        setDefaultValue: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: true,
    }
  )
  Users.addHook(
    "beforeCreate",
    user => (user.password = bcrypt.hashSync(user.password, 10))
  )
  Users.associate = models => {
    Users.hasMany(models.Operations, {
      ondelete: 'cascade'
    })
  }
  return Users
}
