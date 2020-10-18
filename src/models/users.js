const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model ({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        trim: true,
        required:true,
        lowerCase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }
    },

    phone: {
        type: Number,
        required: true,
        trim: true,
    }
});


module.exports= User