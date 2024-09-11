const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Customer Schema
const CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Simple regex for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  status: {
    type: String,
    required: true
  },
  membershipId: {
    type: Schema.Types.ObjectId,
    ref: 'Membership',
    required: true
  }
});

module.exports = mongoose.model('Customers', CustomerSchema);
