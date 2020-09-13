const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');


autoIncrement.initialize(mongoose);

const userSchema = mongoose.Schema({
    userId: { type: Number},
    name: { type: String },
    noOfOrders:{ type: Number,default:0}
});

userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'userId',
    startAt: 1,
    incrementBy: 1
});


const User = mongoose.model('User', userSchema);

module.exports = User;