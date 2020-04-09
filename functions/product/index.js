const express = require('express');
const router = express.Router();

const newProduct = require('./newProduct');
const listProduct = require('./listProduct');

router.post('/new', newProduct);
router.get('/list', listProduct)

module.exports = router;