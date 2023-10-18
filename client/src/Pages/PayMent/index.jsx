import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentOptions = ({ onSelect, selectedOption }) => (
  <div className="flex flex-wrap justify-between md:space-x-4 my-6">
    {['creditCard', 'netBanking', 'paypal'].map((option) => {
      const labels = {
        creditCard: 'Credit Card',
        netBanking: 'Net Banking',
        paypal: 'PayPal'
      };
      return (
        <button 
          key={option}
          className={`w-full md:w-auto m-1 md:m-0 p-4 border rounded-lg shadow-md transition-transform transform ${selectedOption === option ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white scale-105' : 'bg-white hover:bg-gray-100'}`} 
          onClick={() => onSelect(option)}>
          {labels[option]}
        </button>
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
    // Implement further logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 md:p-6 rounded-lg shadow-md">
      {['bankName', 'accountNumber', 'ifscCode'].map((field, index) => {
        const placeholders = {
          bankName: 'Enter Bank Name',
          accountNumber: 'Enter Account Number',
          ifscCode: 'Enter IFSC Code'
        };
        const labels = {
          bankName: 'Bank Name',
          accountNumber: 'Account Number',
          ifscCode: 'IFSC Code'
        };

        return (
          <div key={index} className="flex flex-col">
            <label className="mb-2 text-lg font-medium">{labels[field]}</label>
            <input 
              type="text" 
              name={field}
              value={bankDetails[field]}
              onChange={handleChange}
              placeholder={placeholders[field]}
              className="p-2 border rounded-lg"
            />
          </div>
        );
      })}
      <button type="submit" className="mt-4 p-2 w-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-shadow">
        Pay Now
      </button>
    </form>
  );
};

const PayPalButton = () => {
  const handlePayPalPayment = () => {
    console.log("Redirecting to PayPal...");
  };

  return (
    <button onClick={handlePayPalPayment} className="p-2 w-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-shadow">
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
    }
  };

  return (
    <div className="space-y-6">
      <PaymentOptions onSelect={handleOptionSelect} selectedOption={selectedOption} />
      {selectedOption === 'creditCard' && (
        <form onSubmit={handleStripeSubmit} className="space-y-4 bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="p-2 border rounded-lg">
            <CardElement />
          </div>
          <button type="submit" className="p-2 w-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-shadow">
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
  <div className="px-4 py-6 md:px-0">
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </div>
);

export default Payment;
