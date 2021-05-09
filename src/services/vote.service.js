const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const productService = require('./product.service');
const userService = require('./user.service');

const vote = async (voteBody, user) => {
  const product = await productService.getProductById(voteBody.productId);
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product doesnt exist');
  }
  if (user.votedOn.includes(product.id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already voted on this product');
  }
  const userUpdated = user;
  userUpdated.votedOn.push({ productId: product.id, type: voteBody.type });
  if (voteBody.type === 'up') {
    product.votes += 1;
  } else if (voteBody.type === 'down') {
    product.votes -= 1;
  }
  await userService.updateUserById(user.id, userUpdated);
  await productService.updateProductById(voteBody.productId, product);
  return product;
};

module.exports = {
  vote,
};
