const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0
            }
            if (!err) {
                cart = JSON.parse(fileContent)
            }

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct;
            if (existingProduct) {
                // create a new object based on the existing
                updatedProduct = { ...existingProduct }
                // added quantity
                updatedProduct.qty++
                console.log(cart.products[existingProduct])
                // push the updated product into the cart
                cart.products[existingProductIndex] = updatedProduct
            } else {
                // create an new product
                updatedProduct = { id: id, qty: 1}
                // add the new into the existing cart
                cart.products = [ ...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) { throw new Error(err) }
            })
        })
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) { return ; }
            const currentCart = JSON.parse(fileContent)
            const product = currentCart.products.find(prod => prod.id === id)
            if (!product) { return ; }
            currentCart.products = currentCart.products.filter(prod => prod.id !== id)
            currentCart.totalPrice = currentCart.totalPrice - (parseInt(productPrice) * parseInt(product.qty))
            fs.writeFile(p, JSON.stringify(currentCart), err => {
                console.log(err)
            })
        })
    }

    static getCartProducts(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([])
            } else {
                cb(JSON.parse(fileContent))
            }
        })
    }
}