const crypto = require("crypto");
const Order = require("../models/orderModel");
const { errorHandling } = require("../utils/errorHandler");
const { uuid } = require("uuidv4");

// Simulate Payment Creation
exports.makePayment = async (req, res) => {
  try {
    // Simulate payment options and creation
    const options = {
      amount: req.body.amount * 100, // Simulated amount in paise
      currency: "INR",
      receipt: uuid(),
      payment_capture: 1,
    };

    // Simulate a successful order creation
    const order = {
      id: uuid(),
      status: "created",
      ...options,
    };

    res.status(200).json({
      status: "success",
      order,
    });
  } catch (err) {
    errorHandling(res, err, "order");
  }
};

// Simulate Payment Verification
exports.verifyPayment = async (req, res) => {
  try {
    // Simulate successful payment verification without Razorpay signature
    const { items, price, address } = req.body.order;
    const user = req.user._id;
    const simulatedPaymentId = uuid();

    // Create the order record in the database
    const orderData = await Order.create({
      items,
      price,
      user,
      address,
      transactionID: simulatedPaymentId, // Using simulated payment ID
    });

    res.status(201).json({
      order: orderData,
    });
  } catch (err) {
    errorHandling(res, err, "order");
  }
};

// Fetch User Orders
exports.getUserOrders = (req, res) => {
  Order.find({ user: req.user._id })
    .then((data) => {
      res.status(200).json({
        orders: data,
      });
    })
    .catch((err) => {
      errorHandling(res, err, "order");
    });
};
