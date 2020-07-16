const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const rootDir = require('./util/path')

const adminRoute = require('./routes/admin')
const shopRoute = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(rootDir, 'public')))

app.use('/admin', adminRoute,)
app.use(shopRoute)

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})

app.listen(3031)