const express = require('express')
const mongoose = require('mongoose')
const ProductRoutes = express.Router()
const Product = require('../../models/Product')
const productController = require('./productController')
const { isNullorUndefinedorEmpty } = require('../../utility/util')

const ObjectId = mongoose.Types.ObjectId
const axios = require("axios");

async function createproduct(req, res) {
  try {
    if (isNullorUndefinedorEmpty(req.body.name) && isNullorUndefinedorEmpty(req.body.price) && isNullorUndefinedorEmpty(req.body.rating) && isNullorUndefinedorEmpty(req.body.company)) {
      //Store Prouct Info
      const createProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        company: req.body.company,
        featured: isNullorUndefinedorEmpty(req.body.featured) ? req.body.featured : false
      })
      const saveProduct = await createProduct.save()
      res.json({
        err: null,
        data: {
          ...saveProduct._doc,
          createdAt: saveProduct.createdAt.toISOString(),
          updatedAt: saveProduct.updatedAt.toISOString()
        }
      })
    } else {
      console.log(error);
      console.log('here')
      res.json({
        error: "Provide all Mandatory Fields",
        data: null
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      error: "Something Went Wrong",
      data: null
    })
  }
}

async function deleteproduct(req, res) {
  try {
    if (isNullorUndefinedorEmpty(req.body.productid)) {
      const getproduct = await Product.remove({ _id: req.body.productid })

      res.json({
        err: null,
        data: 'Data is Deleted'
      })

    } else {
      res.json({
        error: "Provide all Mandatory Fields",
        data: null
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      error: "Something Went Wrong",
      data: null
    })
  }
}

async function updateproduct(req, res) {
  try {
    if (isNullorUndefinedorEmpty(req.body.productid)) {

      const getproduct = await Product.findOne({ _id: req.body.productid }).lean()
      if (getproduct !== null) {
        const updateproduct = await Product.updateOne({
          _id: req.body.productid
        }, {
          $set: {
            name: isNullorUndefinedorEmpty(req.body.brandName) ? req.body.name : getproduct.name,
            price: isNullorUndefinedorEmpty(req.body.brandName) ? req.body.price : getproduct.price,
            rating: isNullorUndefinedorEmpty(req.body.brandName) ? req.body.rating : getproduct.rating,
            company: isNullorUndefinedorEmpty(req.body.brandName) ? req.body.company : getproduct.company,
            featured: isNullorUndefinedorEmpty(req.body.featured) ? req.body.featured : getproduct.featured
          }
        })

        const saveproduct = await Product.findOne({ _id: req.body.productid })
        res.json({
          err: null,
          data: {
            ...saveproduct._doc,
            createdAt: saveproduct.createdAt.toISOString(),
            updatedAt: saveproduct.updatedAt.toISOString()
          }
        })
      } else {
        res.json({
          error: "Product Doesn't Exists",
          data: null
        })
      }
    } else {
      res.json({
        error: "Provide all Mandatory Fields",
        data: null
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      error: "Something Went Wrong",
      data: null
    })
  }
}



async function getproducts(req, res) {
  try {
    const getproduct = await Product.find()
    // console.log(getproduct);
    if (getproduct !== null) {
      res.json({
        error: null,
        data: getproduct
      })
    } else {
      res.json({
        error: "No Product available",
        data: null
      })
    }

  } catch (error) {
    res.json({
      error: "Something Went Wrong",

      data: null
    })
  }
}

async function featuredproduct(req, res) {
  try {

    const getproduct = await Product.find({ featured: true })
    // console.log(getproduct);
    if (getproduct !== null) {
      res.json({
        error: null,
        data: getproduct
      })
    } else {
      res.json({
        error: "No Product available",
        data: null
      })
    }

  } catch (error) {
    res.json({
      error: "Something Went Wrong",

      data: null
    })
  }
}

async function productpricelessthan(req, res) {
  try {

    const fetchp= await Product.aggregate([{
      $match: {
        price: { $lt: 1000 }
      }
    }
    ])

    res.json({
      error: null,
      data: fetchp
    })
} catch (error) {
  res.json({
    error: "something went wrong",
    data: null
  })
}
}

async function productrating(req, res) {
  try {

    const productr= await Product.aggregate([{
      $match: {
        rating: { $gt: 2 }
      }
    }
    ])

    res.json({
      error: null,
      data: productr
    })
} catch (error) {
  res.json({
    error: "something went wrong",
    data: null
  })
}
}


module.exports = {
  createproduct,
  deleteproduct,
  updateproduct,
  getproducts,
  featuredproduct,
  productpricelessthan,
  productrating
}