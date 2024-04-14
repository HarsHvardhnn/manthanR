const mongoose = require("mongoose");

const supAdminModelSchema = new mongoose.Schema({
  admin:{
    type:String,
    required:true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const supAdminModel = mongoose.model("superadmin", supAdminModelSchema);
module.exports = supAdminModel;
