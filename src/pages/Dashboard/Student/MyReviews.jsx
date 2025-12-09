import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../api/axios";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editReview, setEditReview] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");

  const fetchMyReviews = () => {
    if (user?.email) {
      setLoading(true);
      axios
        .get(`/reviews/user/${user.email}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => {
          setReviews(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchMyReviews();
  }, [user]);

  const handleEdit = (review) => {
    setEditReview(review);
    setEditRating(review.ratingPoint);
    setEditComment(review.reviewComment);
    document.getElementById("edit_modal").showModal();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `/reviews/${editReview._id}`,
        {
          ratingPoint: editRating,
          reviewComment: editComment,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          alert("Review updated successfully");
          fetchMyReviews();
          document.getElementById("edit_modal").close();
        }
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      axios
        .delete(`/reviews/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => {
          if (res.data) {
            alert("Review deleted successfully");
            fetchMyReviews();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6">My Reviews</h2>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Reviews Yet
          </h3>
          <p className="text-gray-600">
            Complete your applications to leave reviews for scholarships
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Scholarship</th>
                <th>University</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td className="font-semibold">
                    {review.scholarshipName || "N/A"}
                  </td>
                  <td>{review.universityName}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold">
                        {review.ratingPoint}/5
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="max-w-xs truncate">
                      {review.reviewComment}
                    </div>
                  </td>
                  <td>{new Date(review.reviewDate).toLocaleDateString()}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(review)}
                        className="btn btn-xs btn-primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Review Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Review</h3>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Rating (1-5)</span>
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={editRating}
                onChange={(e) => setEditRating(parseInt(e.target.value))}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Comment</span>
              </label>
              <textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                className="textarea textarea-bordered h-24"
                placeholder="Update your review..."
                required
              ></textarea>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Update Review
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("edit_modal").close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MyReviews;
