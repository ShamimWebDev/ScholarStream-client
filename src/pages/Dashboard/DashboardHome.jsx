/**
 * Dashboard Home Page
 * Overview with stats, charts, and recent activities
 */

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const role = user?.role || "student";

  useEffect(() => {
    // Fetch dashboard stats for admin
    if (role === "admin") {
      axios
        .get("/admin/stats", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => setStats(res.data))
        .catch((err) => console.error(err));
    }

    // Fetch recent applications for students
    if (role === "student" && user?.email) {
      axios
        .get(`/applications/my-applications/${user.email}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => setApplications(res.data.slice(0, 3)))
        .catch((err) => console.error(err));
    }
  }, [role, user]);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {role === "admin" && stats ? (
          <>
            <StatCard
              title="Total Scholarships"
              value={stats.totals.scholarships}
              icon="🎓"
              color="bg-blue-50 text-blue-600"
            />
            <StatCard
              title="Active Applications"
              value={stats.totals.applications}
              icon="📄"
              color="bg-green-50 text-green-600"
            />
            <StatCard
              title="Approved Applications"
              value={
                stats.applicationsByStatus.find((s) => s.name === "completed")
                  ?.value || 0
              }
              icon="✅"
              color="bg-purple-50 text-purple-600"
            />
            <StatCard
              title="Total Funding"
              value="$2.4M"
              icon="💰"
              color="bg-orange-50 text-orange-600"
            />
          </>
        ) : (
          <>
            <StatCard
              title="My Applications"
              value={applications.length}
              icon="📄"
              color="bg-blue-50 text-blue-600"
            />
            <StatCard
              title="Pending"
              value={applications.filter((a) => a.status === "pending").length}
              icon="⏳"
              color="bg-yellow-50 text-yellow-600"
            />
            <StatCard
              title="Approved"
              value={
                applications.filter((a) => a.status === "completed").length
              }
              icon="✅"
              color="bg-green-50 text-green-600"
            />
            <StatCard
              title="Available Scholarships"
              value="1,247"
              icon="🎓"
              color="bg-purple-50 text-purple-600"
            />
          </>
        )}
      </div>

      {/* Recent Applications */}
      {role === "student" && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Recent Applications
            </h2>
            <Link
              to="/dashboard/my-applications"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {applications.length > 0 ? (
              applications.map((app) => (
                <div
                  key={app._id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {app.scholarshipName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Applied{" "}
                      {new Date(app.applicationDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      app.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : app.status === "processing"
                        ? "bg-blue-100 text-blue-700"
                        : app.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                No applications yet. Start applying to scholarships!
              </p>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {role === "student" && (
            <>
              <Link
                to="/scholarships"
                className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition"
              >
                <div className="text-3xl mb-2">🔍</div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Browse Scholarships
                </h3>
                <p className="text-sm text-gray-600">Find your perfect match</p>
              </Link>
              <Link
                to="/dashboard/my-applications"
                className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-md transition"
              >
                <div className="text-3xl mb-2">📄</div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  My Applications
                </h3>
                <p className="text-sm text-gray-600">Track your progress</p>
              </Link>
              <Link
                to="/dashboard/profile"
                className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-md transition"
              >
                <div className="text-3xl mb-2">👤</div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Update Profile
                </h3>
                <p className="text-sm text-gray-600">Keep info current</p>
              </Link>
            </>
          )}
          {role === "admin" && (
            <>
              <Link
                to="/dashboard/add-scholarship"
                className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition"
              >
                <div className="text-3xl mb-2">➕</div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Add Scholarship
                </h3>
                <p className="text-sm text-gray-600">Create new opportunity</p>
              </Link>
              <Link
                to="/dashboard/manage-users"
                className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-md transition"
              >
                <div className="text-3xl mb-2">👥</div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Manage Users
                </h3>
                <p className="text-sm text-gray-600">User administration</p>
              </Link>
              <Link
                to="/dashboard/analytics"
                className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-md transition"
              >
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  View Analytics
                </h3>
                <p className="text-sm text-gray-600">Insights & reports</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div
        className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center text-2xl`}
      >
        {icon}
      </div>
    </div>
  </div>
);

export default DashboardHome;
