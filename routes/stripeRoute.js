const { v4 : uuidv4 } = require('uuid');
const express = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const router = express.Router();
const Order = require("../Models/orderModel");

router.post('/checkout', async (req, res) => {
  const { token, user, cartItems, cart } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(cart.cartTotalAmount * 100),
      currency: "inr",
      customer: customer.id,
      receipt_email: token.email,
      payment_method_types: ['card'],
      
    },{
      idempotencyKey: uuidv4()
    });

    if (paymentIntent) {
      const order = new Order({
        userId: user._id,
        name: user.name,
        email: user.email,
        orderItems: cartItems,
        shippingAddress: {
          address: token.card.address_line1,
          city: token.card.address_city,
          zipcode: token.card.address_zip,
          country: token.card.address_country
        },
        orderAmount: cart.cartTotalAmount,
        transactionId: paymentIntent.id,
        isDelivered: false
      });

      await order.save();

      res.send("Order Placed Successfully...");
    } else {
      res.status(400).json({ message: "Payment failed..." });
    }
  } catch (error) {
    console.error("Error occurred while processing payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/getordersbyuser", async (req, res) => {
  try {
    const userId = req.body.userId;
    const orders = await Order.find({ userId }); 
    res.send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error..." });
  }
});
router.post("/getorderbyid", async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const order = await Order.find({_id:orderId}); 
    res.send(order[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error..." });
  }
});
router.get("/getAllOrders", async (req, res) => {
  try {
    const orders = await Order.find({}); 
    res.send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error..." });
  }
});

module.exports = router;
