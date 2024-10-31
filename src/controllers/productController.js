import catchAsync from '../utils/catchAsync.js';

// NOTE: if query same make alias else make features
const aliasProducts = (req, res, next) => {};

// CREATE PRODUCT
const createProduct = catchAsync((req, res, next) => {});

// GET ALL PRODUCTS
const getAllProducts = catchAsync((req, res, next) => {});

// GET SINGLE PRODUCT
const getSingleProduct = catchAsync((req, res, next) => {});

// UPDATE PRODUCT
const updateProduct = catchAsync((req, res, next) => {});

// DELETE PRODUCT
const deleteProduct = catchAsync((req, res, next) => {});

export const ProductController = {
  aliasProducts,
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
