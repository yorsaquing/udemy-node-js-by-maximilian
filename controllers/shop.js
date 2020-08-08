const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
};

exports.getProduct = (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(product => {
      res.render('shop/product-detail', {
        pageTitle: product.title,
        path: '/products/' + req.params.id,
        product: product
      })
    })
    .catch((err) => {
      throw new Error(err)
    })
}

exports.getIndex = (req, res, next) => {
  Product.findAll({})
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err)
    })
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({
    include: ['products']
  })
    .then((orders) => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders
      });
    })
};

exports.postCart = (req, res, next) => {
  let fetchedCart
  let newQuantity = 1
  req.user.getCart()
    .then((cart) => {
      fetchedCart = cart
      return cart.getProducts({
        where: {
          id: req.body.id
        }
      })
    })
    .then(products => {
      let product
      if (products.length > 0) {
        product = products[0]
      } 

      if (product) {
        const oldQuantity = product.cartItem.quantity
        newQuantity = oldQuantity + 1
        return product
      }

      return Product.findByPk(req.body.id)
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: {
          quantity: newQuantity
        }
      })
    })
    .then(() => {
      res.redirect('/cart')
    })
}

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then((cart) => {
      return cart.getProducts().then(products => {
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Cart',
          products: products
        })
      })
      .catch(err => { console.log(err) })
    })
    .catch((err) => { console.log(err) })
}

exports.postCartDeleteItem  = (req, res, next) => {
  const { id, price } = req.body
  req.user.getCart()
    .then((cart) => {
      return cart.removeProduct(id)
    })
    .then(() => {
      res.redirect('/cart')
    })
}

exports.postCheckout = (req, res, next) => {
  let fetchedCart
  req.user.getCart()
    .then((cart) => {
      fetchedCart = cart
      return cart.getProducts()
    })
    .then((products) => {
      return req.user.createOrder()
        .then((order) => {
          return order.addProducts(products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity}
            return product
          }))
        })
    })
    .then(() => {
      return fetchedCart.setProducts(null)
    })
    .then(() => {
      res.redirect('/orders')
    })
}