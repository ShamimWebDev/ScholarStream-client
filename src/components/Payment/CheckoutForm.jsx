/**
 * Stripe Checkout Form Component
 *
 * Handles payment processing for scholarship applications using Stripe.
 * Creates payment intent, processes card payment, and saves application to database.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.scholarship - Scholarship object containing fees and details
 */

import React, { useEffect, useState, useContext } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ scholarship }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    applicationFees,
    scholarshipName,
    universityName,
    subjectCategory,
    scholarshipCategory,
    degree,
    _id,
  } = scholarship;

  /**
   * Create payment intent on component mount
   * Fetches client secret from backend for Stripe payment confirmation
   */
  useEffect(() => {
    if (applicationFees > 0) {
      axios
        .post(
          "/payment/create-payment-intent",
          { price: applicationFees },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        )
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [applicationFees]);

  /**
   * Handle payment form submission
   * Processes card payment and creates application record on success
   *
   * @param {Event} event - Form submit event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    // Confirm card payment with Stripe
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // Save application to database after successful payment
        const application = {
          scholarshipId: _id,
          scholarshipName: scholarshipName,
          universityName: universityName,
          subjectCategory: subjectCategory,
          scholarshipCategory: scholarshipCategory,
          degree: degree,
          userEmail: user.email,
          userName: user.displayName,
          applicationDate: new Date(),
          transactionId: paymentIntent.id,
          price: applicationFees,
          status: "pending",
        };

        const res = await axios.post("/applications", application, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });

        if (res.data.insertedId || res.data._id) {
          navigate("/payment-success");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary mt-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay ${applicationFees}
      </button>
      <p className="text-red-600 mt-2">{error}</p>
      {transactionId && (
        <p className="text-green-600">Transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
