const express = require('express')
const mongoose = require('mongoose')
const ProductRoutes = express.Router()
const Product = require('../models/Product')
const productController = require('../controllers/product/productController')


ProductRoutes.post('/server/createproduct', productController.createproduct)
ProductRoutes.post('/server/deleteproduct', productController.deleteproduct)
ProductRoutes.post('/server/updateproduct', productController.updateproduct)
ProductRoutes.post('/server/featuredproduct', productController.featuredproduct)
ProductRoutes.get('/server/getproducts', productController.getproducts)
ProductRoutes.post('/server/productrating', productController.productrating)
ProductRoutes.post('/server/productpricelessthan', productController.productpricelessthan)




module.exports = ProductRoutes;