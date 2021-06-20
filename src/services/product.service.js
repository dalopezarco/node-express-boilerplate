const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

const categoryService = require('./category.service');

/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody) => {
  const category = await categoryService.getCategoryByName(productBody.category);
  if (!category) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category doesnt exists');
  }
  if (productBody.name && (await Product.isNameTaken(productBody.name))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product name is  already taken');
  }
  const newProductBody = productBody;
  newProductBody.category = category.id;
  newProductBody.votes = 0;
  const product = await Product.create(newProductBody);
  categoryService.updateCategoryById(category.id, { products: category.products.concat(product.id) });
  return product;
};

/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (filter, options) => {
  const products = await Product.paginate(filter, { ...options, populate: 'category' });
  return products;
};

/**
 * Query top products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTopProducts = async (filter, options) => {
  const products = await Product.find().sort({ votes: -1 }).limit(options.limit).populate('category');
  return products;
};

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  return Product.findById(id);
};

/**
 * Get product by email
 * @param {string} email
 * @returns {Promise<Product>}
 */
const getProductByName = async (email) => {
  return Product.findOne({ email });
};

/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductById = async (productId, updateBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.remove();
  return product;
};

const addCommentToProduct = async (productId, comment) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const newProduct = { ...product, comments: product.comments.push(comment) };
  Object.assign(product, newProduct);
  await product.save();
  return product;
};

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  getProductByName,
  updateProductById,
  deleteProductById,
  queryTopProducts,
  addCommentToProduct,
};
