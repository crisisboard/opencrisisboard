/**
 * admin model (Singleton)
 */
const mongoose = require('mongoose');

// TODO: Create a new model for AdminSettings
const adminSchema = mongoose.Schema({
  board_name: String,
  board_logo_URL: String,
});

module.exports = mongoose.model('admin', adminSchema);