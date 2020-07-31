const express = require('express')
const { 
    getProducts,
    getHomePage,
    getCart,
    getCheckout,
    getOrders
} = require('../controllers/shop')
const router = express.Router()

router.get('/', getHomePage)

router.get('/products', getProducts)

router.get('/cart', getCart)

router.get('/checkout', getCheckout)

router.get('/orders', getOrders)

module.exports = router