import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const scholarshipRes = await axios.get(`/scholarships/${id}`);
        setScholarship(scholarshipRes.data);

        // Fetch reviews roughly concurrently or after
        const reviewsRes = await axios.get(`/reviews/${id}`);
        setReviews(reviewsRes.data);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading)
    return (
      <div className="text-center my-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (!scholarship)
    return (
      <div className="text-center my-20 text-xl font-bold">
        Scholarship not found.
      </div>
    );

  const {
    scholarshipName,
    universityName,
    universityImage,
    universityCountry,
    universityCity,
    scholarshipCategory,
    degree,
    tuitionFees,
    applicationFees,
    serviceCharge,
    applicationDeadline,
    scholarshipPostDate,
    universityWorldRank,
    subjectCategory,
  } = scholarship;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header: Image & Basic Info */}
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        <div className="w-full lg:w-1/2">
          <img
            src={universityImage}
            alt={universityName}
            className="w-full h-80 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full lg:w-1/2 space-y-4">
          <h1 className="text-4xl font-bold">{scholarshipName}</h1>
          <h2 className="text-2xl text-gray-600">
            {universityName}{" "}
            <span className="badge badge-primary">
              {universityWorldRank ? `Rank: #${universityWorldRank}` : ""}
            </span>
          </h2>
          <p className="text-lg">
            <span className="font-semibold">Location:</span> {universityCity},{" "}
            {universityCountry}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Degree:</span> {degree} |{" "}
            <span className="font-semibold">Subject:</span> {subjectCategory}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Deadline:</span>{" "}
            {new Date(applicationDeadline).toLocaleDateString()}
          </p>

          <div className="flex gap-4 items-center mt-4">
            <div className="badge badge-lg badge-accent p-4">
              {scholarshipCategory}
            </div>
            <div className="text-2xl font-bold text-primary">
              App Fees: ${applicationFees}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Link
              to={`/checkout/${id}`}
              className="btn btn-primary btn-lg flex-grow"
            >
              Apply for Scholarship
            </Link>
          </div>
        </div>
      </div>

      {/* Additional Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 bg-base-100 p-6 rounded-lg shadow">
        <div>
          <h3 className="text-xl font-bold mb-2">Financial Details</h3>
          <p>
            <strong>Tuition Fees (Estimated):</strong> ${tuitionFees || "N/A"}
          </p>
          <p>
            <strong>Service Charge:</strong> ${serviceCharge}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Dates</h3>
          <p>
            <strong>Posted On:</strong>{" "}
            {new Date(scholarshipPostDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Deadline:</strong>{" "}
            {new Date(applicationDeadline).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Description - (Assuming basic description from now as it wasn't in original schema but usually needed) */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-4">About this Scholarship</h3>
        <p className="leading-relaxed text-gray-700">
          This scholarship offers a great opportunity for students pursuing{" "}
          {degree} in {subjectCategory}. Ideally this section would contain a
          rich text description. For now, we are displaying the core structured
          data available.
        </p>
      </div>

      {/* Reviews Section using Swiper (or grid for simplicity first, user requirement mentioned Swiper for reviews in Home, but simpler here is fine unless requested) */}
      <div>
        <h3 className="text-2xl font-bold mb-6">
          Student Reviews ({reviews.length})
        </h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">
            No reviews yet. Be the first to review after applying!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <div key={idx} className="card bg-base-100 shadow-xl border">
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-10">
                        <span className="text-xs">
                          {review.userName.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{review.userName}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(review.reviewDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="rating rating-sm mb-2">
                    {[...Array(5)].map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        checked={i < review.ratingPoint}
                        disabled
                      />
                    ))}
                  </div>
                  <p className="italic">"{review.reviewComment}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetails;
