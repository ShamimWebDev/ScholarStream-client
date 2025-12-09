import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [detailsApp, setDetailsApp] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchApplications = () => {
    setLoading(true);
    axios
      .get("/applications", {
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
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusUpdate = (id, status) => {
    axios
      .patch(
        `/applications/${id}/status`,
        { status },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          fetchApplications();
        }
      })
      .catch((err) => console.error(err));
  };

  const handleReject = (id) => {
    if (window.confirm("Are you sure you want to reject this application?")) {
      handleStatusUpdate(id, "rejected");
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `/applications/${selectedApp._id}/feedback`,
        { feedback },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          alert("Feedback added");
          setFeedback("");
          setSelectedApp(null);
          fetchApplications();
          document.getElementById("feedback_modal").close();
        }
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6">Manage Applications</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>University</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>
                  <div className="font-semibold">{app.userName}</div>
                  <div className="text-sm text-gray-500">{app.userEmail}</div>
                </td>
                <td>
                  <div className="font-medium">{app.universityName}</div>
                  <div className="text-sm text-gray-500">
                    {app.scholarshipName}
                  </div>
                </td>
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
                  <span
                    className={`badge ${
                      app.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {app.paymentStatus}
                  </span>
                </td>
                <td>
                  <div className="max-w-xs truncate">
                    {app.feedback || (
                      <span className="text-gray-400">No feedback</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    {/* Details Button */}
                    <button
                      onClick={() => {
                        setDetailsApp(app);
                        document.getElementById("details_modal").showModal();
                      }}
                      className="btn btn-xs btn-info"
                    >
                      Details
                    </button>

                    {/* Feedback Button */}
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setFeedback(app.feedback || "");
                        document.getElementById("feedback_modal").showModal();
                      }}
                      className="btn btn-xs btn-secondary"
                    >
                      Feedback
                    </button>

                    {/* Status Update Buttons */}
                    {app.status === "pending" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(app._id, "processing")
                        }
                        className="btn btn-xs btn-primary"
                      >
                        Process
                      </button>
                    )}
                    {app.status === "processing" && (
                      <button
                        onClick={() => handleStatusUpdate(app._id, "completed")}
                        className="btn btn-xs btn-success"
                      >
                        Complete
                      </button>
                    )}

                    {/* Reject Button */}
                    {app.status !== "rejected" &&
                      app.status !== "completed" && (
                        <button
                          onClick={() => handleReject(app._id)}
                          className="btn btn-xs btn-error"
                        >
                          Reject
                        </button>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Modal */}
      <dialog id="feedback_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add Feedback</h3>
          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Feedback for {selectedApp?.userName}
                </span>
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="textarea textarea-bordered h-24"
                placeholder="Enter your feedback..."
                required
              ></textarea>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("feedback_modal").close()
                }
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

      {/* Details Modal */}
      <dialog id="details_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Application Details</h3>
          {detailsApp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Applicant Name</p>
                  <p className="font-semibold">{detailsApp.userName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{detailsApp.userEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">University</p>
                  <p className="font-semibold">{detailsApp.universityName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Scholarship</p>
                  <p className="font-semibold">{detailsApp.scholarshipName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Degree</p>
                  <p className="font-semibold">{detailsApp.degree}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subject Category</p>
                  <p className="font-semibold">
                    {detailsApp.subjectCategory || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Application Fees</p>
                  <p className="font-semibold">
                    ${detailsApp.applicationFees || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service Charge</p>
                  <p className="font-semibold">
                    ${detailsApp.serviceCharge || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Application Status</p>
                  <span
                    className={`badge ${
                      detailsApp.status === "completed"
                        ? "badge-success"
                        : detailsApp.status === "rejected"
                        ? "badge-error"
                        : detailsApp.status === "processing"
                        ? "badge-info"
                        : "badge-warning"
                    }`}
                  >
                    {detailsApp.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <span
                    className={`badge ${
                      detailsApp.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {detailsApp.paymentStatus}
                  </span>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Application Date</p>
                  <p className="font-semibold">
                    {new Date(detailsApp.applicationDate).toLocaleDateString()}
                  </p>
                </div>
                {detailsApp.feedback && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Feedback</p>
                    <p className="font-semibold">{detailsApp.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById("details_modal").close()}
            >
              Close
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ManageApplications;
