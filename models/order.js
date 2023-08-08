const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    },
    apartment: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
        default: 0,
    },
    totalPrice: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },    
    dateOrdered: {
        type: Date,
        default: Date.now,
    }

})

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

orderSchema.set('toJSON', { virtuals: true });


exports.Order = mongoose.model('Order', orderSchema);