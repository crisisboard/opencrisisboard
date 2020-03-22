/**
 * admin model (Singleton)
 */
const mongoose = require('mongoose');

// TODO: Create a new model for AdminSettings
const settingsSchema = mongoose.Schema({
  board_name: String,
  board_logo_URL: String,
});

module.exports = mongoose.model('settings', settingsSchema);