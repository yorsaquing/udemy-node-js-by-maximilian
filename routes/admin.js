const path = require('path');

const express = require('express');

const {
    getAddProduct,
    getProducts,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct
} = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

// /admin/products => GET
router.get('/products', getProducts);

// /admin/add-product => POST
router.post('/add-product', postAddProduct);

// editing product
router.post('/edit-product', postEditProduct);
router.get('/edit-product/:id', getEditProduct);

// deleting product
router.post('/delete-product/:id', postDeleteProduct)

module.exports = router;
