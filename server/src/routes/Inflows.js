const express = require('express')
const router = express.Router()
const { Inflows } = require('../models')

router.get('/', async (req, res) => {
    res.send('API working just right!')
})

router.get('/inflows', async (req, res) => {
    const inflows = await Inflows.findAll()
    res.json(inflows)
})

router.get('/inflows/:id', async (req, res) => {
    const inflowId = req.params.id
    const inflowById = await Inflows.findOne({ where: { id: inflowId } })
    res.json(inflowById)
})

router.post('/inflows/add', async (req, res) => {
    const inflows = req.body
    await Inflows.create(inflows)
    res.json(inflows)
    console.log('Inflow added!')
})

router.put('/inflows/put/:id', async (req, res) => {
    const inflowId = req.params.id
    const inflowUpdatedData = req.body
    const inflowById = await Inflows.findOne({ where: { id: inflowId } })
    const inflowUpdated = await inflowById.update(inflowUpdatedData)
    res.json(inflowUpdated)
    console.log('Inflow updated!')
})

router.delete('/inflows/delete/:id', async (req, res) => {
    const inflowId = req.params.id
    await Inflows.destroy({ where: { id: inflowId } })
    console.log('Inflow deleted!')
})

module.exports = router