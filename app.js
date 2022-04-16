require('dotenv').config()
const notFound = require('./middleware/NotFound')
const errorHandler = require('./middleware/ErrorHandler')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')


//middleware
app.use(express.json())

//routes
app.use('/api/v1/products', productsRouter);

app.use(notFound)
app.use(errorHandler)

//server startup  with db connection
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