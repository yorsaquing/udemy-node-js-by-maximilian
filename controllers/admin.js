const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product({ ...req.body, id: null });
  product.save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      throw new Error(err)
    });
};

exports.getEditProduct = (req, res, next) => {
  Product.findById(req.params.id, (product) => {
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
  const product = new Product({ ...req.body })
  product.save()
  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('admin/products', {
        prods: rows,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
};


exports.postDeleteProduct = (req, res, next) => {
  if (!req.params.id) { res.redirect('/admin/products') }
  Product.deleteById(req.params.id, () => {
    res.redirect('/admin/products')
  })
}