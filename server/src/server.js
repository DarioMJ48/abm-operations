const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const session = require('express-session')
var FileStore = require('session-file-store')(session)
var fileStoreOptions = {};

const app = express()

app.use(cors({
  origin: process.env.ORIGIN, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
  key: "userId",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    expires: 60 * 60 * 24 * 1000
  },
  store: new FileStore(fileStoreOptions)
}))

app.use('/users', require('./routes/users'))
app.use('/operations', require('./routes/operations'))

const db = require('./models')
const PORT = process.env.PORT
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`)
  })
})
