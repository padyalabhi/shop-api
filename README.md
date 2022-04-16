# shop-api
#### Tehnical Task by AlgoDomain
## REST Api to access , manipulate products
## How to Setup
#### To setup project first download project repository and open folder in VS Code or you can use terminal to run project
### Step 1 : Installing required Dependencies for project
#### -> To install all Dependencies required to run Project files you must first run command
#### npm install
#### -> after running this command It will install all required dependencies from package.json fie
### Step 2 : Setting up Database Connection
#### -> To Set Up Database first create Clusture in MongoDb Atlas and get Db connection url
#### -> Open .env file present in root folder
#### -> Set MONGO_URI variable with Db url you copied from MongoDb Atlas
### Now Project is Ready To Run
#### Project Working
### Product Structure
#### -> In root folder you will obtain product structure by visiting products.json file
#### -> Follow the same in Project
-----------------------------
## PROJECT ROUTES
-----------------------------

|            URL           |    Method    |                Action            |
|--------------------------|--------------|----------------------------------|
| localhost:3000/products  | get          |return all products present in Db |
| localhost:3000/product?  | get          |allows options to filter products |

| query |                  filter                      |
|-------|----------------------------------------------|
|name   | to search products with help of product name |
|type   | to search products with help of product type |
|categ  | to search products with help of product categ|
|min    | to search products with minimun price range  |
|max    | to search products with maximum price range  |

Examples URL : localhost:3000/producst?name=headphone&max=1000
---------------------------------------------------------------

|                 URL                |     Method    |      params            |                           result                            |
|------------------------------------|---------------|------------------------|-------------------------------------------------------------|
|      localhost:3000/products       | post          |  seller in req headers |              allow seller to create new product             |
| localhost:3000/products/:seller    | get           |  seller in path        |             returns all product created by seller           |
| localhost:3000/product/:seller/:id | patch         |  seller,pid in path    |      used to update product from seller's product list      |
| localhost:3000/product/:seller/:id | delete        |  seller,pid in path    |           type allows seller to delter own products         |

