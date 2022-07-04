const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema({

    _id: Number,
    fdShopId: {
        required: true,
        type: Number,
    },
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
orderSchema.plugin(AutoIncrement);
module.exports = mongoose.model('restaurent_orders', orderSchema)