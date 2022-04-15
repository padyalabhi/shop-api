const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'product name must be provided']
    },
    categ : {
        type : String,
        required : [true, 'product categeory must be provided']
    },
    type : {
        type : String,
        required : [true, 'product type must be provided']
    },
    price : {
        type : Number,
        required : [true, 'product price must be provided']
    },
    seller : {
        type : String,
        required : [true , 'product seller must be provided']
    },
    specs : []
})


module.exports = mongoose.model('Product', productSchema)
