// The payment page component

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import StyledButton from "../../components/StyledButton";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// OPTIONS MENU
const PaymentOptions = ({ onSelect, selectedOption }) => (
  <div className="flex flex-col justify-center gap-4 md:gap-8 mb-4 md:flex-row">
    {["creditCard", "netBanking", "paypal"].map((option) => {
      const labels = {
        creditCard: "Credit Card",
        netBanking: "Net Banking",
        paypal: "PayPal",
      };
      return (
        <button
          key={option}
          className={`transform rounded-lg border px-8 py-2 shadow-md transition-transform ${
            selectedOption === option
              ? "scale-105 bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
          onClick={() => onSelect(option)}
        >
          {labels[option]}
        </button>
      );
    })}
  </div>
);

// NETBANKING FORM
const NetbankingForm = () => {
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/netbanking-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bankDetails),
    }).then((response) => {
      // Handle response from server here
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg bg-white p-4 shadow-md md:p-6"
    >
      {["bankName", "accountNumber", "ifscCode"].map((field, index) => {
        const placeholders = {
          bankName: "Enter Bank Name",
          accountNumber: "Enter Account Number",
          ifscCode: "Enter IFSC Code",
        };
        const labels = {
          bankName: "Bank Name",
          accountNumber: "Account Number",
          ifscCode: "IFSC Code",
        };
        return (
          <div key={index} className="flex flex-col">
            <label className="mb-2">{labels[field]}</label>
            <input
              type="text"
              name={field}
              value={bankDetails[field]}
              onChange={handleChange}
              placeholder={placeholders[field]}
              className="rounded-lg border p-2 mb-2"
              required
            />
          </div>
        );
      })}
      <div className="mt-4 flex justify-center">
        <StyledButton submit primaryColor>
          Pay with Net Banking
        </StyledButton>
      </div>
    </form>
  );
};

// PAYPAL FORM
const PayPalButton = ({ donationAmount }) => {
  const handlePayPalPayment = () => {
    const baseURL = "https://www.paypal.com/cgi-bin/webscr?";
    const businessEmail = "arunmailme77@gmail.com";
    const item_name = "Donation";
    const currency_code = "USD";
    const amount = donationAmount || '1';

    const queryParams = `cmd=_xclick&business=${businessEmail}&item_name=${item_name}&amount=${amount}&currency_code=${currency_code}`;

    window.location.href = baseURL + queryParams;
  };

  return (
    <div className="flex justify-center">
      <StyledButton submit primaryColor onClick={handlePayPalPayment}>
        Pay with PayPal
      </StyledButton>
    </div>
  );
};


// CREDIT CARD FORM
const CheckoutForm = ({ donationAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [selectedOption, setSelectedOption] = useState("creditCard");
  const [feedback, setFeedback] = useState('');

  const handleOptionSelect = (option) => setSelectedOption(option);

  const handleStripeSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      setFeedback(result.error.message);
    } else {
      setFeedback('Card is accepted');
     }
  };

  return (
    <div className="container m-auto rounded-2xl bg-beige p-5 shadow-lg">
      <PaymentOptions
        onSelect={handleOptionSelect}
        selectedOption={selectedOption}
      />
      {selectedOption === "creditCard" && (
        <form
          onSubmit={handleStripeSubmit}
          className="rounded-lg bg-white p-4 shadow-md md:p-6"
        >
          <div className="rounded-lg border p-2">
            <CardElement />
          </div>
          <div className="flex justify-center mt-4">
            <StyledButton submit primaryColor>
              Pay with Credit Card
            </StyledButton>
          </div>
          <div className="mt-2 text-center">
            {feedback}
          </div>
        </form>
      )}
      {selectedOption === "netBanking" && <NetbankingForm />}
      {selectedOption === "paypal" && <PayPalButton donationAmount={donationAmount} />}
    </div>
  );
};



const Payment = () => {
  // State to store donation amount
  const [donationAmount, setDonationAmount] = useState('');

  return (
    <section className="container m-auto md:pt-32 h-full p-5">
      <h2 className="text-2xl font-bold mb-2 text-center">Donations Accepted</h2>
      <p className="mb-4 text-center">This is a free app that a team of developers worked hard on! Any donations welcome.</p>

      {/* Donation Amount Input */}
      <div className="mb-4">
        <label className="block mb-2 text-center" htmlFor="donationAmount">Enter Donation Amount ($)</label>
        <input
          type="number"
          id="donationAmount"
          className="w-full p-2 rounded border"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <Elements stripe={stripePromise}>
      <CheckoutForm donationAmount={donationAmount} />
      </Elements>
    </section>
  );
};

export default Payment;