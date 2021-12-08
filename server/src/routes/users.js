const express = require('express')
const router = express.Router()
const { Users, Operations } = require('../models')
const bcrypt = require('bcrypt')

router.get('/all', async (req, res) => {
    try {
      await Users.findAll({ include: Operations }).then((users) => {
        users.length >= 1 ? res.json(users) : res.send('THERE ARE NO USERS REGISTERED YET.')
      })
    } catch (error) {
      res.json(error.message)
    }
})
  
router.get('/id/:id', async (req, res) => {
    const userId = req.params.id
  
    await Users.findAll().then((users) => {
      if (users.length >= 1) {
        try {
          Users.findOne({ where: { id: userId }, include: Operations }).then((thisUser) => {
            thisUser ? res.json(thisUser) : res.send('THERE IS NO USER WITH THIS ID.')
          })
        } catch (error) {
          res.json(error.message)
        }
      } else {
        res.send('THERE ARE NO USERS REGISTERED YET.')
      }
    })
})
  
router.post('/register', async (req, res) => {
    const newUser = req.body
    
    try {
      await Users.create(newUser)
      res.json(newUser)
    } catch (error) {
      res.json(error.message)
    }
})
  
router.post('/login', async (req, res) => {
    const {email, password} = req.body
  
    await Users.findAll().then((users) => {
      if (users.length >= 1) {
        try {
          Users.findOne({ where: { email: email } }).then((user) => {
            if (user) { 
              bcrypt.compare(password, user.dataValues.password, (error, response) => {
                if (response) {
                  req.session.user = user.dataValues
                  res.json(req.session.user)
                } else {
                  res.send('INCORRECT USERNAME AND/OR PASSWORD.')
                }
              })
            } else {
              res.send('INCORRECT USERNAME AND/OR PASSWORD.')
            }
          })
        } catch (error) {
          res.json(error.message)
        }
      } else {
        res.send('THERE ARE NO USERS REGISTERED YET.')
      }
    })
})
  
router.get('/checklogin', async (req, res) => {
    try {
      if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
      } else {
        res.send({ loggedIn: false })
      }
    } catch (error) {
      res.json(error.message)
    }
})

module.exports = router
