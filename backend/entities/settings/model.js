/**
 * Settings model (Singleton)
 */
const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
  board_name: String,
  board_logo_URL: String,
});

module.exports = mongoose.model('settings', settingsSchema);