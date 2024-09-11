const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Membership Schema
const MembershipSchema = new Schema({
  membershipType: {
    type: String,
    required: true
  },
  benefits: {
    type: String
  }
});

module.exports = mongoose.model('Membership', MembershipSchema);
