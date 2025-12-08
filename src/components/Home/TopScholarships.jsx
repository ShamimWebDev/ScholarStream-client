import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import ScholarshipCard from "../common/ScholarshipCard";
import { Link } from "react-router-dom";

const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/scholarships/top")
      .then((res) => {
        setScholarships(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center my-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="my-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Top Scholarships</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {scholarships.map((scholarship) => (
          <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/scholarships" className="btn btn-outline btn-primary">
          View All Scholarships
        </Link>
      </div>
    </div>
  );
};

export default TopScholarships;
