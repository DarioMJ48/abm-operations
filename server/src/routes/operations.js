const express = require('express')
const router = express.Router()
const { Operations, Users } = require('../models')

router.get('/all', async (req, res) => {
  try {
    await Operations.findAll().then((operations) => {
      operations.length >= 1 ? res.json(operations) : res.send('THERE ARE NO OPERATIONS YET.')
    })
  } catch (error) {
    res.json(error.message)
  }
})

router.get('/id/:id', async (req, res) => {
  const id = req.params.id

  await Operations.findAll().then((operations) => {
    if (operations.length >= 1) {
      try {
        Operations.findOne({ where: { id: id } }).then((thisOperation) => {
          thisOperation ? res.json(thisOperation) : res.send('THERE IS NO OPERATION WITH THIS ID.')
        })
      } catch (error) {
        res.json(error.message)
      }
    } else {
      res.send('THERE ARE NO OPERATIONS YET.')
    }
  })
})

router.post('/add', async (req, res) => {
  const newOperation = req.body

  try {
    await Operations.create(newOperation)
    res.json(newOperation)
  } catch (error) {
    res.json(error.message)
  }
})

router.put('/update/:id', async (req, res) => {
  const id = req.params.id
  const newOperationData = req.body

  try {
    await Operations.findOne({ where: { id: id } }).then((currentOperationData) => {
      if (currentOperationData) {
        currentOperationData.update(newOperationData)
        res.json(newOperationData)
      } else {
        res.send('THERE IS NO OPERATION WITH THIS ID.')
      }
    })
  } catch (error) {
    res.json(error.message)
  }
})

router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id

  try {
    await Operations.destroy({ where: { id: id } }).then((deletedOperation) => {
      deletedOperation ? res.send('OPERATION DELETED.') : res.send('THERE IS NO OPERATION WITH THIS ID.')
    })
  } catch (error) {
    res.json(error.message)
  }
})

module.exports = router
