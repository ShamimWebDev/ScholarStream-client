import React from "react";
import { Link } from "react-router-dom";

const ScholarshipCard = ({ scholarship }) => {
  const {
    _id,
    universityName,
    universityImage,
    scholarshipCategory,
    universityCountry,
    universityCity,
    applicationFees,
    subjectCategory,
    applicationDeadline,
  } = scholarship;

  return (
    <div className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure>
        <img
          src={universityImage}
          alt={universityName}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {universityName}
          <div className="badge badge-secondary">{scholarshipCategory}</div>
        </h2>
        <p className="text-sm text-gray-500">
          {universityCity}, {universityCountry}
        </p>
        <div className="flex flex-col gap-1 my-2">
          <p>
            <strong>Subject:</strong> {subjectCategory}
          </p>
          <p>
            <strong>App Fees:</strong> ${applicationFees}
          </p>
          <p>
            <strong>Deadline:</strong>{" "}
            {new Date(applicationDeadline).toLocaleDateString()}
          </p>
          {/* Placeholder for Rating */}
          <div className="rating rating-sm">
            <input
              type="radio"
              name={`rating-${_id}`}
              className="mask mask-star-2 bg-orange-400"
              disabled
              checked
            />
            <span className="ml-2 text-xs">(4.8)</span>
          </div>
        </div>
        <div className="card-actions justify-end">
          <Link to={`/scholarship/${_id}`} className="btn btn-primary btn-sm">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
