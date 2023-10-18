const { Schema, model } = require('mongoose');

const creditCardSchema = new Schema({
    cardNumber: String,
    expiryDate: Date,
    CVV: String,
    cardHolderName: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const CreditCard = model('CreditCard', creditCardSchema);

module.exports = CreditCard;
