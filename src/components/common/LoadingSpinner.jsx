// Loading spinner component
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        <div
          className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 opacity-50"
          style={{ animationDirection: "reverse" }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
