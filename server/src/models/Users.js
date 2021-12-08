const Operations = require('./Operations')
const { UUIDV4 } = require('sequelize/dist')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'MUST BE A VALID E-MAIL ADDRESS.'
          }
        }
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
