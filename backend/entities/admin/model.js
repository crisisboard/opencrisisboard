/**
 * admin model, singleton instance in the DB
 */
const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  boardName: String,
  boardLogoImageURL: String,
});

module.exports = mongoose.model('admin', adminSchema);