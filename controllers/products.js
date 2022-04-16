const Product = require('../models/products');
const {customError, createCustomError} = require('../errors/CustomError')
const asyncWrapper = require('../middleware/AsyncWrapper');

//filtering products based on name , type , categ , price
const getAllProducts = asyncWrapper(
    async (req,res,next) => {
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
        if(!result)
        {
            return next(createCustomError("No any result found", 201))
        }
        res.status(200).json({ result , items : result.length});
    }
)

//create product
const createProduct = asyncWrapper(
    async (req,res,next) => {
        const seller = req.headers['seller'];
       if(seller)
       {
           const product = await Product.create(req.body);
           res.status(200).json({product});
       }
       else
       {
           return next(createCustomError("You are not authorized to access page", 401))
       }
    }
)

//display seller specific products
const getMyProducts = asyncWrapper(
    async (req,res,next) => {
       
        const {seller} = await req.params;
        const product = await Product.find({seller : seller});
        if(!product)
        {
            return next("please check your seller id ", 404)
        }
        res.status(200).json({product , items : product.length});
    }
)

//delete product for seller
const deleteProduct = asyncWrapper(
    async (req,res,next) => {
        const {seller, id} = req.params;
        const product = await Product.findOneAndDelete({seller : seller , _id : id});
        if(!product)
        {
            return next(createCustomError(`No product foud with id ${id}`, 404))
        }
        res.status(200).json({product});
    }
)

//update product for seller
const updateProduct = asyncWrapper(
    async (req,res,next) => {
        const {seller , id} = req.params;
        const product = await Product.findOneAndUpdate({ _id : id , seller : seller}, req.body , {
            new : true,
            runValidators : true
        })
    
        if(!product)
        {
            return next(createCustomError(`No product with id ${id}`, 404))
        }
        res.status(200).json({product});
    }
)


module.exports = {
    getAllProducts,
    createProduct,
    getMyProducts,
    deleteProduct,
    updateProduct
}