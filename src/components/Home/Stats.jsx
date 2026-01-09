import React from "react";

import {
  FaGraduationCap,
  FaUserGraduate,
  FaUniversity,
  FaMoneyBillWave,
} from "react-icons/fa";

const Stats = () => {
  const stats = [
    {
      icon: <FaGraduationCap className="text-4xl text-primary" />,
      count: "15,000+",
      label: "Scholarships Available",
    },
    {
      icon: <FaMoneyBillWave className="text-4xl text-secondary" />,
      count: "$25M+",
      label: "Funds Awarded",
    },
    {
      icon: <FaUserGraduate className="text-4xl text-accent" />,
      count: "50,000+",
      label: "Active Students",
    },
    {
      icon: <FaUniversity className="text-4xl text-info" />,
      count: "1,200+",
      label: "Partner Universities",
    },
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300"
            >
              <div className="card-body items-center text-center">
                <div className="mb-4 bg-base-200 p-4 rounded-full">
                  {stat.icon}
                </div>
                <h2 className="card-title text-4xl font-bold text-neutral">
                  {stat.count}
                </h2>
                <p className="text-neutral/60 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
