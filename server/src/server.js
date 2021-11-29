const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const inflowsRouter = require('./routes/Inflows')
const outflowsRouter = require('./routes/Outflows')
app.use('/', inflowsRouter)
app.use('/', outflowsRouter)

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const db = require('./models')
const PORT = process.env.PORT
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}!`)
    })
})