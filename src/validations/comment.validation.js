const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addCommentToProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      comment: Joi.string(),
    })
    .min(1),
};

module.exports = {
  addCommentToProduct,
};
