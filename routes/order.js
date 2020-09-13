const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');


router.post('/create', async (req, res) => {
    const order = new Order(req.body);
    try {
        let response = await order.save();
        return res.status(200).send(response);
    }
    catch (e) {
        return res.status(404).send(e.message);
    }
});


router.get('/get', (req, res) => {
    Order.find((err, data) => {
        if (err) {
            return res.status(404).send(' No Orders Yet');
        }
        return res.status(200).send(data);
    })
});


/* Write an API which returns total no of orders placed and average bill subtotal,
user wise. Response should be array of user as follows:
[{ userId : 1, name : “Rahul”, noOfOrders: 5, averageBillValue : 650},
{userId : 2, name : “Ramesh”, noOfOrders : 3, averageBillValue :966 },
{userId: 3, name : “Ankita”, noOfOrders : 2, averageBillValue : 850}] */




module.exports = router;