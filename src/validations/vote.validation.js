const Joi = require('joi');

const vote = {
  body: Joi.object().keys({
    productId: Joi.string().required(),
  }),
};

module.exports = {
  vote,
};
