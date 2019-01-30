const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  displayName: String,
  spotifyId: {
    type: String,
    unique: true,
  },
  profileUrl: String,
  token: {
    refresh: String,
    expires: Number,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
