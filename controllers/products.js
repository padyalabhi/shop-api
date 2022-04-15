const Product = require('../models/products');
const list = require('../products.json');

//get all products 
const getAllProductsStatic = async (req,res) => {
    const list = await Product.find().populate('specs').exec();
    res.status(200).json({ list , items : list.length});
}

//filtering products based on name , type , categ , price
const getAllProducts = async (req,res) => {
    const { name , type , categ , min , max} = req.query;
    const queryObject = {};

    if( name )
    {
        queryObject.name = { $regex : name , $options : 'i'} ;
    }
    if( type )
    {
        queryObject.type = {$regex : type , $options : 'i'} ;
    }
    if( categ )
    {
        queryObject.categ = {$regex : categ , $options : 'i'};
    }
    if( min & max)
    {
        queryObject.price = { $gte : Number(min) , $lte : Number(max)  };
    }
    if( min )
    {
        queryObject.price = { $gte : Number(min) };
    }
    if( max )
    {
        queryObject.price = { $lte : Number(max)};
    }
    
    let result = await Product.find(queryObject);
    res.status(200).json({ result , items : result.length});
}

//create product
const createProduct = async (req,res) => {
    const seller = req.headers['seller'];
   if(seller)
   {
       const product = await Product.create(req.body);
       res.status(200).json({product});
   }
   else
   {
       res.send("not authorized")
   }
}

//display seller specific products
const getMyProducts = async (req,res) => {
    const {seller} = req.params;
    const product = await Product.find({seller : seller});
    res.status(200).json({product});
}

//delete product for seller
const deleteProduct = async (req,res) => {
    const {seller, id} = req.params;
    const product = await Product.findOneAndDelete({seller : seller , _id : id});
    if(!product)
    {
        console.log("not found product");
    }
    res.status(200).json({product});
}

const updateProduct = async (req,res) => {
    const {seller , id} = req.params;
    const product = await Product.findOneAndUpdate({ _id : id , seller : seller}, req.body , {
        new : true,
        runValidators : true
    })

    if(!product)
    {
        console.log("something went wrong");
    }
    res.status(200).json({product});
}


module.exports = {
    getAllProducts,
    getAllProductsStatic,
    createProduct,
    getMyProducts,
    deleteProduct,
    updateProduct
}