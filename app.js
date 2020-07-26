const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
// const expressHbs = require('express-handlebars')

const app = express()
// handlebars
// app.engine('hbs', expressHbs({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs'
// }))
// app.set('view engine', 'hbs')

// set the templating engine to pug
// app.set('view engine', 'pug')

// set the templating engine to ejs
app.set('view engine', 'ejs')
app.set('views', 'views')

const rootDir = require('./util/path')

const adminData = require('./routes/admin')
const shopRoute = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(rootDir, 'public')))

app.use('/admin', adminData.routes)
app.use(shopRoute)

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: "Page Not Found"})
})

app.listen(3031)
console.log("Listening to localhost:3031")