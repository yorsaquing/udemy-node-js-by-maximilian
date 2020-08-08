const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  req.user.createProduct({ ...req.body })
    .then(() => {
    res.redirect('/admin/products')
  }).catch(err => { console.log(err) })
};

exports.getEditProduct = (req, res, next) => {
  req.user.getProducts({
    where: {
      id: req.user.id
    }
  }).then(products => {
    const product = products[0]
    if (!product) {
      res.redirect('/admin/products')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      product
    });
  })
};

exports.postEditProduct = (req, res, next) => {
  Product.findByPk(req.body.id)
    .then(product => {
      product.title = req.body.title
      product.imageUrl =  req.body.imageUrl
      product.price = req.body.price
      product.description = req.body.description
      
      return product.save()
    })
    .then(() => {
      res.redirect('/admin/products')
      console.log('Updated Product')
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getProducts = (req, res, next) => {
  req.user.getProducts().then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
};


exports.postDeleteProduct = (req, res, next) => {
  if (!req.params.id) { res.redirect('/admin/products') }

  Product.findByPk(req.params.id)
    .then((product) => {
      return product.destroy()
    })
    .then(() => {
      res.redirect('/admin/products')
      console.log("Product removed")
    })
    .catch((err) => {
      console.log(err)
    })
}