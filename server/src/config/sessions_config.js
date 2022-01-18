const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

var FileStore = require('session-file-store')(session)
var fileStoreOptions = {}

const sessionOptions = {
    key: "userId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      expires: 60 * 60 * 24 * 1000
    },
    store: new FileStore({fileStoreOptions})
}

export default sessionOptions