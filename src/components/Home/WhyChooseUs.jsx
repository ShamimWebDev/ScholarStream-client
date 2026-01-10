import React from "react";
import { FaCheckCircle, FaSearch, FaUserShield, FaClock } from "react-icons/fa";

const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Verified Scholarships",
      description:
        "We verify every scholarship to ensure it's legitimate and active.",
      icon: <FaCheckCircle className="text-3xl text-success" />,
    },
    {
      title: "Smart Search",
      description: "Find the perfect match with our advanced filtering system.",
      icon: <FaSearch className="text-3xl text-primary" />,
    },
    {
      title: "Secure Application",
      description:
        "Your data is encrypted and safe with our secure application portal.",
      icon: <FaUserShield className="text-3xl text-secondary" />,
    },
    {
      title: "Deadline Alerts",
      description:
        "Never miss an opportunity with timely reminders for upcoming deadlines.",
      icon: <FaClock className="text-3xl text-warning" />,
    },
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 font-sans text-neutral">
            Why Choose <span className="text-primary">ScholarStream?</span>
          </h2>
          <p className="text-neutral/60 max-w-2xl mx-auto">
            We simplify the scholarship journey, making it easier for you to
            find, apply, and succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-base-200/50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral">
                {reason.title}
              </h3>
              <p className="text-neutral/70 text-sm">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
