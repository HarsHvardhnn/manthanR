const mongoose = require('mongoose');
const user = require('./userSchema');
const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  userName:{type:String,required:true},
  admin: { type: String, required: true },
  message: { type: String, required: true },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = { Notification };
