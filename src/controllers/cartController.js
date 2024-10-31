/*

import { Cart } from '../models/cartModel.js';

// GET MY CART
const getMyCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json({
      status: 'success',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// CREATE CART
const createCart = async (req, res, next) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json({
      status: 'success',
      data: savedCart,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL CART
const getAllCarts = async (req, res, next) => {
  try {
    // BUILD QUERY
    // 1A) Filtering
    const queryObj = { ...req.query };
    const excludeFields = [
      'page',
      'sort',
      'limit',
      'fields',
      'search',
      'category',
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Cart.find(JSON.parse(queryStr));

    // 2) searching
    if (req.query.search) {
      const search = req.query.search || '';
      const searchRegexp = new RegExp(`.*${search}.*`, 'i');

      const queryBySearch = {
        $or: [
          { name: { $regex: searchRegexp } },
          { email: { $regex: searchRegexp } },
          { phone: { $regex: searchRegexp } },
          { role: { $regex: searchRegexp } },
        ],
      };
      query = query.find(queryBySearch);
    }

    // 4) Sorting
    if (req.query.sort) {
      const sortedBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortedBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 5) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v -updatedAt');
    }

    // 6) pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numCarts = await Cart.countDocuments();
      if (skip >= numCarts) throw createError(404, 'This page does not exist!');
    }

    // EXECUTE QUERY
    const carts = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: carts.length,
      data: carts,
    });
  } catch (error) {
    next(error);
  }
};

// GET CART
const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json({
      status: 'success',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE CART
const updateCart = async (req, res, next) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      status: 'success',
      data: updatedCart,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE CART
const deleteCart = async (req, res, next) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: deletedCart,
    });
  } catch (error) {
    next(error);
  }
};

export { createCart, getAllCarts, getMyCart, updateCart, deleteCart, getCart };
*/
