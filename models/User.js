const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
   firstname: { type: String, required: true },
   lastname: { type: String, required: true },
   email: { type: String, required: true },
   password: { type: String, required: true, min: 6 },
   picture: { type: String, required: true },
   country: { type: String, required: true },
   google: { type: Boolean, default: false },
})

const User = mongoose.model("user", userSchema)

module.exports = User
