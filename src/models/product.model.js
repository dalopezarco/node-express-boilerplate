const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const { Schema } = mongoose;

const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    votes: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

productSchema.statics.isNameTaken = async function (name, excludeUserId) {
  const product = await this.findOne({ name, _id: { $ne: excludeUserId } });
  return !!product;
};

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
