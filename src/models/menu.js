const mongoose = require('mongoose');
const validator = require('validator');

// creating a menu schema for the database storage
const Menu = mongoose.model('Menu',{
    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        trim: true,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        trim: true
    },

    // this particularly is to show morning or afternoon meal...
    time: {
        type: String,
        required: true,
        trim: true
    }
})


module.exports = Menu;
