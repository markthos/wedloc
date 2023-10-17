import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// CSS for better layout
import './Payment.css';

// Stripe Promise Initialization
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// PaymentOptions Component
const PaymentOptions = ({ onSelect }) => {
  return (
    <div className="payment-options">
      <button onClick={() => onSelect('creditCard')}>Credit Card</button>
      <button onClick={() => onSelect('netBanking')}>Net Banking</button>
      <button onClick={() => onSelect('paypal')}>PayPal</button>
    </div>
  );
};

// CheckoutForm Component
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [selectedOption, setSelectedOption] = useState('');
  const [isCardComplete, setIsCardComplete] = useState(false); // New state to track card input

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleCardChange = (event) => { // Handler to set card completion status
    setIsCardComplete(event.complete);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.error(result.error.message);
    } else {
      fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: result.token.id })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log('Payment successful!');
        } else {
          console.error('Payment failed:', data.message);
        }
      });
    }
  };

  return (
    <div className="checkout-form">
      <PaymentOptions onSelect={handleOptionSelect} />
      {selectedOption === 'creditCard' && (
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="card-input">
            <CardElement onChange={handleCardChange} />
          </div>
          {isCardComplete && ( // Only display "Pay Now" button if card input is complete
            <button type="submit" disabled={!stripe} className="pay-btn">
              Pay Now
            </button>
          )}
        </form>
      )}
      {selectedOption === 'netBanking' && <div>Show Netbanking Form Here</div>}
      {selectedOption === 'paypal' && <div>Show PayPal Form Here</div>}
    </div>
  );
};

// Main Payment Component
const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Payment;
