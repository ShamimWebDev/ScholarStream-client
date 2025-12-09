import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = () => {

    axios
      .get("/reviews", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Delete this review?")) {
      axios
        .delete(`/reviews/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => {
          if (res.data.deletedCount > 0) {
            alert("Deleted");
            fetchReviews();
          }
        });
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl font-bold mb-6">Manage Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review._id} className="card bg-base-100 shadow-xl border">
            <div className="card-body">
              <h3 className="card-title text-sm">{review.universityName}</h3>
              <div className="flex items-center gap-2">
                <span className="font-bold">{review.userName}</span>
                <span className="text-xs text-gray-400">
                  {new Date(review.reviewDate).toLocaleDateString()}
                </span>
              </div>
              <p className="italic text-gray-600">"{review.reviewComment}"</p>
              <div className="rating rating-sm">
                <span className="mr-2">Rating: {review.ratingPoint}</span>
              </div>
              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => handleDelete(review._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;
