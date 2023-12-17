

 //accessing mongoose
const mongoose = require("mongoose")


//Creating Schema
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age:{
        type: Number,
    }
}, {timestamps: true });
//Creating Model
const  User = mongoose.model("User", userSchema)

//exporting model
module.exports = User;
