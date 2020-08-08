const express = require('express');

const {
    getIndex,
    getProducts,
    getCart,
    getOrders,
    postCheckout,
    getProduct,
    postCart,
    postCartDeleteItem
} = require('../controllers/shop');

const router = express.Router();

router.get('/', getIndex);

router.get('/products', getProducts);

router.get('/products/:id', getProduct)

router.get('/cart', getCart);

router.post('/cart', postCart)

router.get('/orders', getOrders);

router.post('/checkout', postCheckout);

router.post('/cart-delete-item', postCartDeleteItem)

module.exports = router;
