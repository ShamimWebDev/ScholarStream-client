
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find the Perfect Scholarship for Your Future
            </h1>
            <p className="text-lg md:text-xl mb-8 text-purple-100">
              Discover and apply for scholarships easily. Connect with
              opportunities that match your academic goals and unlock your
              potential.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/scholarships"
                className="px-8 py-4 bg-white text-purple-700 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
              >
                <span>🔍</span>
                <span>Search Scholarships</span>
              </Link>
              <Link
                to="/scholarships"
                className="px-8 py-4 bg-purple-500 bg-opacity-30 border-2 border-white text-white rounded-lg font-semibold hover:bg-opacity-40 transition"
              >
                Browse All Scholarships
              </Link>
            </div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="bg-pink-200 rounded-3xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🎓</div>
                <p className="text-purple-800 font-semibold text-xl">
                  Join thousands of students achieving their dreams
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Help Button */}
      <button className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-50">
        <span className="text-xl">💬</span>
        <span className="ml-2">Help</span>
      </button>
    </section>
  );
};

export default Banner;
