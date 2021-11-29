const express = require('express')
const router = express.Router()
const { Outflows } = require('../models')

router.get('/', async (req, res) => {
    res.send('API working just right!')
})

router.get('/outflows', async (req, res) => {
    const outflows = await Outflows.findAll()
    res.json(outflows)
})

router.get('/outflows/:id', async (req, res) => {
    const outflowId = req.params.id
    const outflowById = await Outflows.findOne({ where: { id: outflowId } })
    res.json(outflowById)
})

router.post('/outflows/add', async (req, res) => {
    const outflow = req.body
    await Outflows.create(outflow)
    res.json(outflow)
    console.log('Outflow added!')
})

router.put('/outflows/update/:id', async (req, res) => {
    const outflowId = req.params.id
    const outflowUpdatedData = req.body
    const outflowById = await Outflows.findOne({ where: { id: outflowId } })
    const outflowUpdated = await outflowById.update(outflowUpdatedData)
    res.json(outflowUpdated)
    console.log('Outflow updated!')
})

router.delete('/outflows/delete/:id', async (req, res) => {
    const outflowId = req.params.id
    await Outflows.destroy({ where: { id: outflowId } })
    res.send('Outflow deleted!')
    console.log('Outflow deleted!')
})

module.exports = router