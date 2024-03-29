const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength:60
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength:200,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength:1024
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
})

const User = mongoose.model("user",userSchema);
module.exports = User