const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  score:{
    type:String,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'super admin'], 
    default: 'user' 
  },
  createdAt: {
    type: Date,
    default: Date.now
}
  // userData: [{ type: mongoose.Schema.Types.ObjectId, ref: "userData" }],
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
