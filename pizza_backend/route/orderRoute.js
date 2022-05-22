const express = require('express');
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const Order = require('../models/orderModel')
const stripe = require("stripe")("sk_test_51KeyWaSJsjptiHVFiN6RPI5P3J2s5TaPC11Dc3j2mB2molO6eFVMt8BIjWJZD2J3eKOKje3DdIUPBU5ktZXlfiFY00ezK5dloP")


router.post("/placeorder", async (req, res) => {
    const { token, subtotal, currentUser, cartItems } = req.body;
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.paymentIntents.create({
            amount: subtotal * 100,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
            //payment_method_options: ['card']
        }, {
            idempotencyKey: uuidv4()
        })
        //console.log('payments1: ', payment)
        if (payment) {
            
            const newOrder = new Order({
                name: currentUser.name,
                email: currentUser.email,
                userid: currentUser._id,
                orderItems: cartItems,
                orderAmount: subtotal,
                shippingAddress: {
                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    pincode: token.card.address_zip
                },
                //transactionId: payment.source.id
            })
            //console.log("newOrders: ", newOrder)
            newOrder.save()
            res.send('Payment Done')
        }
        else {
            res.send('Payment Failed')
        }
    }
    catch (error) {
        return res.status(400).json({ 'message': 'Something went wrong' + error });
    }
})


router.post('/getuserorders', async (req, res) => {
    const { userid } = req.body;
    try {
        const orders = await Order.find({ userid: userid }).sort({ _id: -1 })
        //console.log("orders are: ", orders)
        res.send(orders)
    } catch (error) {
        return res.status(400).json({ 'message': 'Something went wrong' + error });
    }
})


router.get('/getallorders', async (req, res) => {
    //const { userid } = req.body;
    try {
        const orders = await Order.find({}).sort({ _id: -1 })
        // console.log("orders are: ", orders)
        res.send(orders)
    } catch (error) {
        return res.status(400).json({ 'message': 'Something went wrong' + error });
    }
})

router.post('/deliverorder', async (req, res) => {
    const orderId = req.body.orderid
    try {
        const order = await Order.findOne({ _id: orderId })
        order.isDelivered = true;
        res.send('Order Delivered Successfully')
        await order.save()
    } catch (error) {
        return res.status(400).json({ 'message': 'Something went wrong' + error })
    }

})
module.exports = router