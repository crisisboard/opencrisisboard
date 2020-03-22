/**
 * admin model (Singleton)
 */
const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  board_name: String,
  board_logo_URL: String,
});

module.exports = mongoose.model('admin', adminSchema);