const mongoose = require('mongoose');

// creating the model for the menu:
const Order = mongoose.model('Order',{
    name : {
        type: String,
        required: true,
        trim: true
    },

    quantity: {
        type: Number,
        required: true,
        trim: true,

    },

    completed: {
        type: Boolean,
        default: false,
        
    }
})


module.exports = Order;