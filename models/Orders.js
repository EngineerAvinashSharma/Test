const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');


autoIncrement.initialize(mongoose);

const orderSchema = mongoose.Schema({
    userId: { type: Number, ref: "User" },
    orderId: { type: Number, unique: true },
    subTotal: { type: Number },
    date: { type: String }
});

orderSchema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'orderId',
    startAt: 1,
    incrementBy: 1
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;