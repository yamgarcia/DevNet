const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

User = mongoose.model('user', UserSchema);

module.exports = User;
