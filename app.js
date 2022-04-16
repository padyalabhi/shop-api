require('dotenv').config()
const notFound = require('./middleware/NotFound')
const errorHandler = require('./middleware/ErrorHandler')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

//swagger
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
    swaggerDefinition : {
        openapi : '3.0.1',
        info : {
            title : "Store API",
            description : "Technical Task info",
            contact : {
                name : "Abhijit Padyal"
            },
        },
        servers : [
            {
                url : "http://localhost:3000/", 
            }
        ],
    },
    apis : ["./routes/*"],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);


//middleware
app.use(express.json())

//routes

app.use('/api/v1/products', productsRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

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