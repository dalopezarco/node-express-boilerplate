const express = require('express');
const validate = require('../../middlewares/validate');
const voteValidation = require('../../validations/vote.validation');
const vote = require('../../controllers/vote.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(auth(), validate(voteValidation.vote), vote.vote);

module.exports = router;
