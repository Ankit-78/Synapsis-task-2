const mongoose = require('mongoose');
const docSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  mimetype: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
module.exports = mongoose.model('Document', docSchema);