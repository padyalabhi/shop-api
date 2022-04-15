const express = require('express');
const router = express.Router();

const {getAllProducts , deleteProduct , createProduct, getMyProducts, updateProduct} = require('../controllers/products')

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:seller').get(getMyProducts)
router.route('/:seller/:id').patch(updateProduct).delete(deleteProduct)

module.exports = router