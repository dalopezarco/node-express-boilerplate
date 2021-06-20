const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const CommentSchema = new Schema({
  comment: {
    type: String,
    default: '',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
