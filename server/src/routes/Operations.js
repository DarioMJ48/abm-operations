const express = require('express')
const router = express.Router()
const { Operations } = require('../models')

router.get('/', async (req, res) => {
  try {
    res.send('API working just right!')
  } catch (err) {
    res.json(err.message)
  }
})

router.get('/operations', async (req, res) => {
  try {
    await Operations.findAll().then((operations) => {
      operations.length >= 1 ? res.json(operations) : res.send('There are no operations yet!')
      console.log(operations.length)
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
        Operations.findOne({ where: { id: operationId } }).then((thisOperation) => {
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
    await Operations.findOne({ where: { id: operationId } }).then((currentOperationData) => {
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
    await Operations.destroy({ where: { id: operationId } }).then((deletedOperation) => {
      deletedOperation ? res.send('Operation deleted!') : res.send('There is no operation with this id!')
    })
  } catch (err) {
    res.json(err.message)
  }
})

module.exports = router
