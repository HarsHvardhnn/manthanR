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
  is_profile_complete:{
    type:Boolean,
    default:false
  },
  has_accepted_tnc:{
    type:Boolean,
    default:false},
  createdAt: {
    type: Date,
    default: Date.now
}

});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
