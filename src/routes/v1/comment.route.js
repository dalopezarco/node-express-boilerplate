const express = require('express');
const validate = require('../../middlewares/validate');
const commentValidation = require('../../validations/comment.validation');
const product = require('../../controllers/product.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/:productId').patch(validate(commentValidation.addCommentToProduct), auth(), product.addCommentToProduct);

module.exports = router;
