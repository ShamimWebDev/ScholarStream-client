import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../api/axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppForReview, setSelectedAppForReview] = useState(null);

  const fetchMyApplications = () => {
    if (user?.email) {
      setLoading(true);
      axios
        .get(`/applications/my-applications/${user.email}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => {
          setApplications(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchMyApplications();
  }, [user]);

  const handleAddReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const review = {
      ratingPoint: parseInt(form.rating.value),
      reviewComment: form.comment.value,
      reviewDate: new Date(),
      scholarshipId: selectedAppForReview.scholarshipId,
      scholarshipName: selectedAppForReview.scholarshipName,
      universityName: selectedAppForReview.universityName,
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL,
    };

    axios
      .post("/reviews", review, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => {
        if (res.data._id) {
          alert("Review added successfully");
          document.getElementById("review_modal").close();
          form.reset();
        }
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteApplication = (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      axios
        .delete(`/applications/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => {
          if (res.data) {
            alert("Application deleted successfully");
            fetchMyApplications();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6">My Applications</h2>

      {applications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Applications Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start applying to scholarships to see them here
          </p>
          <Link to="/scholarships" className="btn btn-primary">
            Browse Scholarships
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>University</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Feedback</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>
                    <div className="font-semibold">{app.universityName}</div>
                    <div className="text-sm text-gray-500">
                      {app.scholarshipName}
                    </div>
                  </td>
                  <td>{app.subjectCategory || app.degree}</td>
                  <td>
                    <span
                      className={`badge ${
                        app.status === "completed"
                          ? "badge-success"
                          : app.status === "rejected"
                          ? "badge-error"
                          : app.status === "processing"
                          ? "badge-info"
                          : "badge-warning"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <div className="max-w-xs truncate">
                      {app.feedback || (
                        <span className="text-gray-400">No feedback yet</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/scholarship/${app.scholarshipId}`}
                        className="btn btn-xs btn-info"
                      >
                        Details
                      </Link>

                      {/* Delete button - only for pending */}
                      {app.status === "pending" && (
                        <button
                          onClick={() => handleDeleteApplication(app._id)}
                          className="btn btn-xs btn-error"
                        >
                          Delete
                        </button>
                      )}

                      {/* Add Review button - only for completed */}
                      {app.status === "completed" && (
                        <button
                          className="btn btn-xs btn-secondary"
                          onClick={() => {
                            setSelectedAppForReview(app);
                            document.getElementById("review_modal").showModal();
                          }}
                        >
                          Add Review
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Review Modal */}
      <dialog id="review_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            Rate {selectedAppForReview?.universityName}
          </h3>
          <form onSubmit={handleAddReview} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Rating (1-5)</span>
              </label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Comment</span>
              </label>
              <textarea
                name="comment"
                className="textarea textarea-bordered h-24"
                placeholder="Share your experience..."
                required
              ></textarea>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("review_modal").close()}
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

export default MyApplications;
