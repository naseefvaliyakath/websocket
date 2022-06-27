const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    //need id wirh uniqe
    fdOrder: {
        required: true,
        type: [],
    },
    fdOrderStatus: {
        default:'pending',
        type: String
    },
    fdOrderType: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('restaurent_orders', orderSchema)