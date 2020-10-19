const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// creating a  scream to be a ble use middlewares to modify
const userSchema = new mongoose.Schema({
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
// validating that a user exist
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
     
    if(!user) {
        throw new Error('Invalid user login details')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid user login details')
    }
    
    return user
}
// hashing our password to improve security
userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model ('User', userSchema)

module.exports= User