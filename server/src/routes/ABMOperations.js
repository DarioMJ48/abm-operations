const express = require('express')
const router = express.Router()
const { Users, Operations } = require('../models')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
  try {
    res.send('API working just right!')
  } catch (err) {
    res.json(err.message)
  }
})

router.get('/users', async (req, res) => {
  try {
    await Users.findAll({ include: Operations }).then((users) => {
      users.length >= 1 ? res.json(users) : res.send('There are no users registered yet!')
    })
  } catch (err) {
    res.json(err.message)
  }
})

router.get('/users/:id', async (req, res) => {
  const userId = req.params.id

  await Users.findAll().then((users) => {
    if (users.length >= 1) {
      try {
        Users.findOne({ where: { UserId: userId }, include: Operations }).then((thisUser) => {
          thisUser ? res.json(thisUser) : res.send('There is no user with this id!')
        })
      } catch (err) {
        res.json(err.message)
      }
    } else {
      res.send('There are no users registered yet!')
    }
  })
})

router.post('/users/register', async (req, res) => {
  const newUser = req.body
  
  try {
    await Users.create(newUser)
    res.json(newUser)
  } catch (err) {
    res.json(err.message)
  }
})

router.post('/users/login', async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  await Users.findAll().then((users) => {
    if (users.length >= 1) {
      try {
        Users.findOne({ where: { username: username } }).then((thisUser) => {
          if (thisUser) { 
            bcrypt.compare(password, thisUser.dataValues.password, (err, response) => {
              if (response) {
                req.session.user = thisUser.dataValues
                res.json(thisUser)
              } else {
                res.send('Wrong username or password!')
              }
            })
          } else {
            res.send('Wrong username or password!')
          }
        })
      } catch (err) {
        res.json(err.message)
      }
    } else {
      res.send('There are no users registered yet!')
    }
  })
})

router.get('/userslogin', async (req, res) => {
  try {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user })
    } else {
      res.send({ loggedIn: false })
    }
  } catch (err) {
    res.json(err.message)
  }
})

router.get('/operations', async (req, res) => {
  try {
    await Operations.findAll().then((operations) => {
      operations.length >= 1 ? res.json(operations) : res.send('There are no operations yet!')
    })
  } catch (err) {
    res.json(err.message)
  }
})

router.get('/operations/:id', async (req, res) => {
  const operationId = req.params.id

  await Operations.findAll().then((operations) => {
    if (operations.length >= 1) {
      try {
        Operations.findOne({ where: { OperationId: operationId } }).then((thisOperation) => {
          thisOperation ? res.json(thisOperation) : res.send('There is no operation with this id!')
        })
      } catch (err) {
        res.json(err.message)
      }
    } else {
      res.send('There are no operations yet!')
    }
  })
})

router.post('/operations/add', async (req, res) => {
  const newOperation = req.body

  try {
    await Operations.create(newOperation)
    res.json(newOperation)
  } catch (err) {
    res.json(err.message)
  }
})

router.put('/operations/update/:id', async (req, res) => {
  const operationId = req.params.id
  const newOperationData = req.body

  try {
    await Operations.findOne({ where: { OperationId: operationId } }).then((currentOperationData) => {
      if (currentOperationData) {
        currentOperationData.update(newOperationData)
        res.json(newOperationData)
      } else {
        res.send('There is no operation with this id!')
      }
    })
  } catch (err) {
    res.json(err.message)
  }
})

router.delete('/operations/delete/:id', async (req, res) => {
  const operationId = req.params.id

  try {
    await Operations.destroy({ where: { OperationId: operationId } }).then((deletedOperation) => {
      deletedOperation ? res.send('Operation deleted!') : res.send('There is no operation with this id!')
    })
  } catch (err) {
    res.json(err.message)
  }
})

module.exports = router
