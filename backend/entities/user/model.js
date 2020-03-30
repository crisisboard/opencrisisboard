/**
 * user model
 */
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  avatarUrl: String,
  email: String,
  role: { type: String, default: 'user' }, // ['admin', 'moderator', 'user']
  provider : String,
  profile: mongoose.Mixed,
}, { strict: false });

module.exports = mongoose.model('user', userSchema);
