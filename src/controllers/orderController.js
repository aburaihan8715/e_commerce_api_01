import { Order } from '../models/orderModel.js';

// CREATE ORDER
const createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json({
      status: 'success',
      data: savedOrder,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL ORDERS
const getAllOrders = async (req, res, next) => {};

// GET A ORDER
const getOrder = async (req, res, next) => {};

// UPDATE A ORDER
const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      status: 'success',
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE A ORDER
const deleteOrder = async (req, res, next) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: deletedOrder,
    });
  } catch (error) {
    next(error);
  }
};

// GET MY ORDERS
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json({
      status: 'success',
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// GET MONTHLY INCOME
const getMonthlyIncome = async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: prevMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: income,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  getMyOrders,
  getMonthlyIncome,
};
