const express = require('express');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const product = require('../../controllers/product.controller');

const router = express.Router();

router.route('/').get(validate(productValidation.getTopProducts), product.getTopProducts);

module.exports = router;
