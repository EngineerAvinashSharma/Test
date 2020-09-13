const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Orders');


router.post('/create', async (req, res) => {
    let user = new User(req.body);
    try {
        let data = await user.save();
        return res.status(200).send(data);
    }
    catch (e) {
        return res.status(404).send(e.message);
    }
});


router.get('/get', (req, res) => {
    User.find((err, data) => {
        if (err) {
            return res.status(400).send('User Not Added');
        }
        return res.status(200).send(data);
    })
});

router.delete('/remove/:id', async (req, res) => {
    const id = req.params.id;
    User.deleteOne({ userId: id }, (err, data) => {
        if (err) {
            return res.status(404).send('Not Found');
        }
        return res.status(200).send(data);
    })
});


// Write an API which returns total no of orders placed and average bill subtotal,
// user wise. Response should be array of user as follows:
// [{ userId : 1, name : “Rahul”, noOfOrders: 5, averageBillValue : 650},
// {userId : 2, name : “Ramesh”, noOfOrders : 3, averageBillValue :966 },
// {userId: 3, name : “Ankita”, noOfOrders : 2, averageBillValue : 850}]
router.get('/noOfOrders', (req, res) => {
    User.aggregate([
        {
            $lookup:
            {
                from: "orders",
                localField: "userId",
                foreignField: "userId",
                as: "userOrders"
            }
        },
        {
            $project: {
                _id: 0,
                userId: 1,
                name: 1,
                noOfOrders: { $size: '$userOrders' },
                averageBillValue: { $avg: '$userOrders.subTotal' }
            }
        }
    ]
        , (err, data) => {
            if (err) {
                res.send(err);
            }
            res.send(data);
        })
});
// b. A new key is created in user table (noOfOrders) with default value 0, write an API
// to update it, with its correct value for all users respectively. After calling your API
// the new User table will be as follows:

router.put('/modify/:id', (req, res) => {
    Order.find({ userId: req.params.id }, (err, response) => {
        if (err) {
            return res.status(404).send(err.message);
        }
        req.body.noOfOrders = response.length;
        User.updateOne({ userId: req.params.id }, { $set: req.body }, (err, result) => {
              if(err){
                 return res.status(400).send("Update Faild");
              }
              res.json({ success: true, message : "Successfully updated" });
        })
    })
});

module.exports = router;