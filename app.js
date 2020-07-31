const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const rootDir = require('./util/path')
const adminRoutes = require('./routes/admin')
const shopRoute = require('./routes/shop')
const { get404 } = require('./controllers/error')

const app = express()

// set the templating engine to ejs
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(rootDir, 'public')))

app.use('/admin', adminRoutes)
app.use('/', shopRoute)

app.use(get404)

app.listen(3031)
console.log("Listening to localhost:3031")