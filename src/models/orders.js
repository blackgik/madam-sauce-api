const mongoose = require('mongoose');

// creating the model for the menu:
const Order = mongoose.model({
    name : {
        type: true,
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
        required: true,
        trim: true
    }
})


module.exports = Order;