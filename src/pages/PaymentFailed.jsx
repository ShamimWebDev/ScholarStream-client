import React from "react";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-8">
          We couldn't process your payment. Please try again or use a different
          payment method.
        </p>

        {/* Error Details */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800">
            <strong>Error:</strong> Payment could not be completed
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/dashboard/my-applications"
            className="btn btn-primary w-full"
          >
            Return to Dashboard
          </Link>
          <Link to="/scholarships" className="btn btn-outline w-full">
            Browse Scholarships
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Need Help?</strong> Contact support if you continue to
            experience issues.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
