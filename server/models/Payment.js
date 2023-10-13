const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'  // Reference to the User model
  },
  chargeId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Payment = model('Payment', paymentSchema);

module.exports = Payment;