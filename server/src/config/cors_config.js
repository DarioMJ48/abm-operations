const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

module.exports = {
    corsOptions: {
        origin: process.env.ORIGIN, 
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
}