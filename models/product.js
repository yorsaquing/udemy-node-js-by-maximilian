const fs = require('fs')
const path = require('path')

const productPath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')

/**
 * Get the list of products from the declared file in productPath
 * @param {function} cb 
 */
const getProductsFromFile = (cb) => {
    fs.readFile(productPath, (err, fileContent) => {
        if (err) { 
            cb([]) 
        } else {
            cb(fileContent.toString() === "" ? [] : JSON.parse(fileContent))
        }
    })
}

module.exports = class Product {
    constructor({ title, imageUrl, description, price}) {
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }

    save() {
        // console.log(this)
        getProductsFromFile((products) => {
            products.push(this)
            fs.writeFile(productPath, JSON.stringify(products), (err) => {
                if (err) {
                    fs.writeFile(productPath, JSON.stringify([]))
                }
            })
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }
}