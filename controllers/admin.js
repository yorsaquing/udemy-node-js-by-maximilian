const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', { 
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        activeAddProduct: true,
        formsCSS: true,
        productCSS: true
    })
}

exports.getProducts = (req, res, next) => {
    res.render('admin/products', {
        path: '/admin/products',
        pageTitle: 'Admin Products'
    })
}

exports.postAddProduct = (req, res) => {
    const formData = {
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    }
    const product = new Product(formData)
    product.save()
    res.redirect('/')
}