const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const productService = require('./product.service');
const userService = require('./user.service');

const vote = async (voteBody, user) => {
  const product = await productService.getProductById(voteBody.productId);
  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product doesnt exist');
  }
  const votedIndex = user.votedOn.findIndex((v) => v.productId == product.id);
  const userUpdated = user;
  if (votedIndex !== -1) {
    if (voteBody.type === 'up' && user.votedOn[votedIndex].type === 'up') {
      product.votes -= 1;
      userUpdated.votedOn.splice(votedIndex, 1);
    } else if (voteBody.type === 'up' && user.votedOn[votedIndex].type === 'down') {
      product.votes += 2;
      userUpdated.votedOn.splice(votedIndex, 1);
      userUpdated.votedOn.push({ productId: product.id, type: voteBody.type });
    } else if (voteBody.type === 'down' && user.votedOn[votedIndex].type === 'down') {
      product.votes += 1;
      userUpdated.votedOn.splice(votedIndex, 1);
    } else if (voteBody.type === 'down' && user.votedOn[votedIndex].type === 'up') {
      product.votes -= 2;
      userUpdated.votedOn.splice(votedIndex, 1);
      userUpdated.votedOn.push({ productId: product.id, type: voteBody.type });
    }
  } else {
    userUpdated.votedOn.push({ productId: product.id, type: voteBody.type });
    if (voteBody.type === 'up') {
      product.votes += 1;
    } else if (voteBody.type === 'down') {
      product.votes -= 1;
    }
  }
  await userService.updateUserById(user.id, userUpdated);
  await productService.updateProductById(voteBody.productId, product);
  return product;
};

module.exports = {
  vote,
};
