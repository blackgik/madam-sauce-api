const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model ('User',{
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        required:true,
        lowerCase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        validate(value) {
            if(value.includes('password')) {
                throw new Errow('password should be uniquen and must not containf password')
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