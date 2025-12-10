import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [existingApp, setExistingApp] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const scholarshipRes = await axios.get(`/scholarships/${id}`);
        setScholarship(scholarshipRes.data);

        // Fetch reviews roughly concurrently or after
        const reviewsRes = await axios.get(`/reviews/scholarship/${id}`);
        setReviews(reviewsRes.data);

        // Check if user has already applied for this scholarship
        if (user?.email) {
          const appsRes = await axios.get(`/applications/user/${user.email}`);
          const existingApplication = appsRes.data.find(
            (app) => app.scholarshipId === id
          );
          if (existingApplication) {
            setHasApplied(true);
            setExistingApp(existingApplication);
          }
        }

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
            {hasApplied ? (
              <div className="w-full">
                <div className="alert alert-info">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-current shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <div>
                    <h3 className="font-bold">Already Applied</h3>
                    <div className="text-sm">
                      You have already submitted an application for this
                      scholarship.
                      <br />
                      <span className="font-semibold">Status:</span>{" "}
                      {existingApp?.applicationStatus}
                      {" | "}
                      <span className="font-semibold">Payment:</span>{" "}
                      {existingApp?.paymentStatus}
                    </div>
                  </div>
                </div>
                <Link
                  to="/dashboard/my-applications"
                  className="btn btn-outline btn-primary btn-lg w-full mt-4"
                >
                  View My Applications
                </Link>
              </div>
            ) : (
              <Link
                to={`/checkout/${id}`}
                className="btn btn-primary btn-lg flex-grow"
              >
                Apply for Scholarship
              </Link>
            )}
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
