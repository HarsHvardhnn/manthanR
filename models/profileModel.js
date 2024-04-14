const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  courseAndYear: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  hostelName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  relationshipStatus: {
    type: String,
    required: true
  }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
