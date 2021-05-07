const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const categoryRoute = require('./category.route');
const categoryNamesRoute = require('./categoryNames.route');
const productRoute = require('./product.route');
const topProductsRoute = require('./topProducts.route');
const voteRoute = require('./vote.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/categories',
    route: categoryRoute,
  },
  {
    path: '/categoryNames',
    route: categoryNamesRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/topproducts',
    route: topProductsRoute,
  },
  {
    path: '/vote',
    route: voteRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
