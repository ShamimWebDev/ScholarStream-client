import React from "react";
import {
  FaLaptopCode,
  FaStethoscope,
  FaChartBar,
  FaPalette,
  FaGlobeAmericas,
  FaLeaf,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    {
      name: "Engineering",
      icon: <FaLaptopCode />,
      count: 450,
      color: "bg-primary",
    },
    {
      name: "Medical",
      icon: <FaStethoscope />,
      count: 230,
      color: "bg-secondary",
    },
    { name: "Business", icon: <FaChartBar />, count: 320, color: "bg-accent" },
    {
      name: "Arts & Design",
      icon: <FaPalette />,
      count: 150,
      color: "bg-info",
    },
    {
      name: "Social Sciences",
      icon: <FaGlobeAmericas />,
      count: 280,
      color: "bg-success",
    },
    {
      name: "Environmental",
      icon: <FaLeaf />,
      count: 120,
      color: "bg-warning",
    },
  ];

  return (
    <section className="py-24 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 font-sans text-neutral">
            Browse by <span className="text-primary">Category</span>
          </h2>
          <p className="text-lg text-neutral/60 max-w-2xl mx-auto">
            Explore scholarships tailored to your field of study. Found your
            path? Let us help you fund it.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, idx) => (
            <Link
              to={`/scholarships?category=${cat.name}`}
              key={idx}
              className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-base-200 group cursor-pointer"
            >
              <div className="card-body items-center text-center p-6">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-white ${cat.color} mb-3 group-hover:scale-110 transition-transform`}
                >
                  {cat.icon}
                </div>
                <h3 className="font-bold text-neutral group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral/50">
                  {cat.count} Scholarships
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
