const express = require('express');
const router = express.Router();

const listProduct = require('./listProduct');
const newProduct = require('./newProduct');
const editProduct = require('./editProduct');

router.get('/list', listProduct);
router.post('/new', newProduct);
router.put('/edit', editProduct)

module.exports = router;