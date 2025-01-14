const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { voteService } = require('../services');

const vote = catchAsync(async (req, res) => {
  if (req.user) {
    const { user } = req;
    const { product, newUser } = await voteService.vote(req.body, user);
    res.status(httpStatus.CREATED).send({ product, newUser });
  } else {
    res.status(httpStatus.UNAUTHORIZED).send();
  }
});

module.exports = {
  vote,
};
