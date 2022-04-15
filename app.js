require('dotenv').config()

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

//middleware
app.use(express.json());

//routes
app.get('/', (req,res) => {
    res.send('Hello there');
})

app.use('/api/v1/products', productsRouter);



const port = process.env.PORT || 3000
const start = async () => {
    try {
        //connectDb
        await connectDB(process.env.MONGO_URI);
        app.listen( port , console.log(`listening to the post ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();