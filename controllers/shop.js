const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
};

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .then(([rows, fieldData]) => {
      res.render('shop/product-detail', {
        pageTitle: "Product Details",
        path: '/products/' + req.params.id,
        product: rows[0]
      })
    })
    .catch((err) => {
      throw new Error(err)
    })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch((err) => {
      throw new Error (err)
    })
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postCart = (req, res, next) => {
  Product.findById(req.body.id, (product) => {
    Cart.addProduct(req.body.id, parseInt(product.price))
  })

  res.redirect('/cart')
}

exports.getCart = (req, res, next) => {
  Cart.getCartProducts(cartData => {
    const cp = []
    Product.fetchAll((products) => {
      for (let prod of products) {
        const productDetails = cartData.products.find(p => p.id === prod.id)
        if (productDetails) {
          cp.push({ ...prod, qty: productDetails.qty })
        }
      }

      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Cart',
        products: cp,
        totalPrice: cartData.totalPrice
      })
    })
  })
}

exports.postCartDeleteItem  = (req, res, next) => {
  const { id, price } = req.body
  Cart.deleteProduct(id, price)
  res.redirect('/cart')
}