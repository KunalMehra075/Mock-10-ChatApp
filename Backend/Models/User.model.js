const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    verified: { type: Boolean, default: false }
})
const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel;