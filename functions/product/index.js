const express = require('express');
const router = express.Router();

const newProduct = require('./newProduct');

router.post('/new', newProduct);

module.exports = router;