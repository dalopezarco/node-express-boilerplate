const Joi = require('joi');

const vote = {
  body: Joi.object().keys({
    productId: Joi.string().required(),
    type: Joi.string().required().valid('up', 'down'),
  }),
};

module.exports = {
  vote,
};
