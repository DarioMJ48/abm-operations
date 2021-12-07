const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
var FileStore = require('session-file-store')(session);


const app = express()

app.use(cors({
  origin: ["http://localhost:3000"], // env
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
  key: "userId",
  secret: "secret", // change it later!
  resave: false,
  saveUninitialized: false,
  store: new FileStore(),
  cookie: {
    expires: 60 * 60 * 24
  }
}))

const abmoperationsRouter = require('./routes/ABMOperations')
app.use('/', abmoperationsRouter)

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const db = require('./models')
const PORT = process.env.PORT
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`)
  })
})
