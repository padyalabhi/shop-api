const express = require('express');
const router = express.Router();

const {getAllProducts , deleteProduct , createProduct, getMyProducts, updateProduct} = require('../controllers/products')
/**
 * @swagger
 * paths:
 *   /api/v1/products/:
 *     get:
 *       tags:
 *       - "Customer"
 *       summary: "Customer In Action"
 *       description: "All the activities are here about customer behaviour with API"
 *       operationId: "getAllProducts"
 *       consumes:
 *       - "application/json"
 *       - "application/xml"
 *       produces:
 *       - "application/xml"
 *       - "application/json"
 *       parameters:
 *       - in: "query"
 *         name: "name"
 *         description: "name of the product example : boAt, Tata salt "
 *       - in: "query"
 *         name: "type"
 *         description: "type of the product example : headphones, laptop"
 *       - in: "query"
 *         name: "categ"
 *         description: "category of the product example : electronics , grocery"
 *       - in: "query"
 *         name: "min"
 *         description: "minimum price range of the product"
 *       - in: "query"
 *         name: "max"
 *         description: "maximum price range of the product"
 *       responses:
 *         "400":
 *            description: "Invalid input"
 *     post:
 *       tags:
 *       - "Seller"
 *       summary: "Create Products"
 *       description: "It allows to seller to create products"
 *       operationId: "createProducts"
 *       consumes:
 *       - "application/json"
 *       produces:
 *       - "application/json"
 *       parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "Product Object Needs to be added in store"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Product"
 *       - name: "seller"
 *         in: "header"
 *         required: true
 *         type: "string"
 *       responses:
 *         "405":
 *           description: "Invalid input" 
 * 
 *   /api/v1/products/{seller}:
 *     get:
 *       tags:
 *       - "Seller"
 *       summary: "Get Seller's Products"
 *       description: "It allows to get list of products creates by seller"
 *       operationId: "findMyProducts"
 *       produces:
 *       - "application/json"
 *       parameters:
 *       - name: "seller"
 *         in: "path"
 *         description: "Status values that need to be considered for filter"
 *         required: true
 *         type: "string"
 *       responses:
 *         "200":
 *           description: "successful operation"
 *           schema:
 *             $ref: "#/definitions/Product"
 *         "404":
 *           description: "Invalid seller value"
 * 
 *   /api/v1/products/{seller}/{id}:
 *      patch:
 *        tags:
 *        - "Seller"
 *        summary: "Update Seller's Product"
 *        description: "It allows to update seller pecific product"
 *        operationId: "updateProduct"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "path"
 *          name: "seller"
 *          type: "string"
 *          required: true
 *        - in: "path"
 *          name: "id"
 *          type: "string"
 *          required: true
 *        - in: "body"
 *          name: "body"
 *          description: "Product property that need to get updated"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/Product"
 *       
 *        responses:
 *          "400":
 *            description: "Invalid seller/id supplied"
 *      delete:
 *        tags:
 *        - "Seller"
 *        summary: "Deletes Product"
 *        description: "It allows to delete products"
 *        operationId: "deleteProduct"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - name: "seller"
 *          in: "path"
 *          required: true
 *          type: "string"
 *        - name: "id"
 *          in: "path"
 *          description: "Product Id to delete"
 *          required: true
 *          type: "string"
 *        responses:
 *          "404":
 *            description: "Invalid ID/seller supplied"
 *          
 * 
 * definitions:
 *   Product:
 *     type: "object"
 *     properties:
 *       name:
 *         type: "string"
 *       categ:
 *         type: "string"
 *       type:
 *         type: "string"
 *       price:
 *         type: "integer"
 *       seller:
 *         type: "string"
 *       specs:
 *         type: "array"
 *         items:
 *           type: "object"
 *           properties:
 *             prop:
 *               type: "string"
 *             value:
 *               type: "string" 
 * 
 * 
 * 
 */
router.route('/').get(getAllProducts).post(createProduct)
router.route('/:seller').get(getMyProducts)
router.route('/:seller/:id').patch(updateProduct).delete(deleteProduct)

module.exports = router