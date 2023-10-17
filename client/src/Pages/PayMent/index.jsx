import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payment.css';
import creditCardIcon from './icons/creditCard.png'; 
import netBankingIcon from './icons/netBanking.png';
import paypalIcon from './icons/paypal.png';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentOptions = ({ onSelect, selectedOption }) => (
  <div className="payment-options">
    {['creditCard', 'netBanking', 'paypal'].map((option) => {
      const icons = {
        creditCard: creditCardIcon,
        netBanking: netBankingIcon,
        paypal: paypalIcon
      };
      const labels = {
        creditCard: 'Credit Card',
        netBanking: 'Net Banking',
        paypal: 'PayPal'
      };
      return (
        <div 
          key={option}
          className={`payment-option ${selectedOption === option ? 'active' : ''}`} 
          onClick={() => onSelect(option)}>
          <img src={icons[option]} alt={labels[option]} />
          <span>{labels[option]}</span>
        </div>
      );
    })}
  </div>
);

const NetbankingForm = () => {
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountNumber: '',
    ifscCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Netbanking details submitted:", bankDetails);
    // Implement further logic for processing netbanking details
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Bank Name:</label>
        <input 
          type="text" 
          name="bankName"
          value={bankDetails.bankName}
          onChange={handleChange}
          placeholder="Enter Bank Name" 
        />
      </div>
      <div>
        <label>Account Number:</label>
        <input 
          type="text" 
          name="accountNumber"
          value={bankDetails.accountNumber}
          onChange={handleChange}
          placeholder="Enter Account Number" 
        />
      </div>
      <div>
        <label>IFSC Code:</label>
        <input 
          type="text" 
          name="ifscCode"
          value={bankDetails.ifscCode}
          onChange={handleChange}
          placeholder="Enter IFSC Code" 
        />
      </div>
      <button type="submit" className="pay-btn">
            Pay Now
          </button>
    </form>
  );
};

const PayPalButton = () => {
  // In a real-world scenario, this button would be integrated with PayPal SDK/API
  const handlePayPalPayment = () => {
    console.log("Redirecting to PayPal...");
  };

  return (
    <button onClick={handlePayPalPayment} type="button" className="pay-btn">
      Pay with PayPal
    </button>
  );
};


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [selectedOption, setSelectedOption] = useState('creditCard');
  
  const handleOptionSelect = (option) => setSelectedOption(option);
  const handleStripeSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);
      // Send the token to your server for payment processing
    }
  };

  return (
    <div className="checkout-form">
      <PaymentOptions onSelect={handleOptionSelect} selectedOption={selectedOption} />
      {selectedOption === 'creditCard' && (
        <form onSubmit={handleStripeSubmit} className="payment-form">
          <div className="card-input">
            <CardElement />
          </div>
          <button type="submit" disabled={!stripe} className="pay-btn">
            Pay Now
          </button>
        </form>
      )}
      {selectedOption === 'netBanking' && <NetbankingForm />}
      {selectedOption === 'paypal' && <PayPalButton />}
    </div>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Payment;

