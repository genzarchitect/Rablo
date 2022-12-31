const mongoose = require("mongoose")
const Schema = mongoose.Schema
ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    featured: {
        type: Boolean,
        default: false
    },
    company:{
        type:String,
        required:true
    },
    rating:{
        type:Number
    }
}, { timestamps: true })

module.exports = Product = mongoose.model("Product", ProductSchema);