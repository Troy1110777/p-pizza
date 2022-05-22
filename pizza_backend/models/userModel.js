const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require
    },
    email: {
        type: String,
        require
    },
    password: {
        type: String,
        require
    },
    isAdmin: {
        type: Boolean,
        require,
        default: false
    },
    role:{
        type:String,
        require,
        default: 'user'
    },
    emailToken:{
        type: String
    },
    forgetPassword_token:{
        type: String
    },
    isVerified:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

module.exports = mongoose.model('users', userSchema)
