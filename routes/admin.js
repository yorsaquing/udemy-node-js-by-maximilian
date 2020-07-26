const express = require('express')

const router = express.Router()

const products = []

router.get('/add-product', (req, res, next) => {
    res.render('add-product', { 
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        activeAddProduct: true,
        formsCSS: true,
        productCSS: true
    })
})

router.post('/product', (req, res) => {
    products.push({
        title: req.body.title
    })
    res.redirect('/')
})

exports.routes = router
exports.products = products