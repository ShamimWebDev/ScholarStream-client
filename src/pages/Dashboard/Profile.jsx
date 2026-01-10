import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaEdit, FaSave, FaTimes, FaCamera } from "react-icons/fa";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "badge-error";
      case "moderator":
        return "badge-warning";
      case "student":
        return "badge-info";
      default:
        return "badge-ghost";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile(formData.displayName, formData.photoURL);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          My Profile
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary gap-2"
          >
            <FaEdit /> Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto border border-gray-100 dark:border-gray-700">
        {/* Profile Header / Cover alike */}
        <div className="h-32 bg-linear-to-r from-blue-500 to-indigo-600"></div>

        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full ring-4 ring-white dark:ring-gray-800 overflow-hidden bg-white">
                <img
                  src={
                    isEditing
                      ? formData.photoURL || "https://via.placeholder.com/150"
                      : user?.photoURL ||
                        "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(
                            user?.displayName || user?.name || "User"
                          ) +
                          "&size=128&background=random"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-lg">
                  <FaCamera size={14} />
                </div>
              )}
            </div>

            <div className="flex-1 ml-6 mb-2 hidden sm:block">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {user?.displayName || "User"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-ghost"
                  disabled={loading}
                >
                  <FaTimes /> Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <>
                      <FaSave /> Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <h4 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 text-gray-700 dark:text-gray-200">
              Personal Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-600 dark:text-gray-300">
                    Full Name
                  </span>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="input input-bordered w-full focus:input-primary"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    {user?.displayName || "N/A"}
                  </div>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-600 dark:text-gray-300">
                    Email Address
                  </span>
                </label>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed">
                  {user?.email || "N/A"}
                </div>
              </div>

              {isEditing && (
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium text-gray-600 dark:text-gray-300">
                      Photo URL
                    </span>
                  </label>
                  <input
                    type="text"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleChange}
                    className="input input-bordered w-full focus:input-primary"
                    placeholder="https://example.com/photo.jpg"
                  />
                  <label className="label">
                    <span className="label-text-alt text-gray-400">
                      Provide a direct link to an image file.
                    </span>
                  </label>
                </div>
              )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-600 dark:text-gray-300">
                    Role
                  </span>
                </label>
                <div className="flex items-center">
                  <span
                    className={`badge ${getRoleBadgeColor(
                      user?.role
                    )} badge-lg capitalize py-3 px-4`}
                  >
                    {user?.role || "Student"}
                  </span>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-600 dark:text-gray-300">
                    Join Date
                  </span>
                </label>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                  {formatDate(user?.createdAt || user?.metadata?.creationTime)}
                </div>
              </div>
            </div>

            {/* Role Specific Info - Only show when not editing or always? Keeping it simple */}
            {!isEditing && (
              <>
                <div className="divider"></div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
                    <span className="badge badge-primary badge-sm"></span>
                    {user?.role ? (
                      <span className="capitalize">
                        {user.role} Permissions
                      </span>
                    ) : (
                      "User Permissions"
                    )}
                  </h5>
                  {user?.role?.toLowerCase() === "admin" && (
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1 ml-2">
                      <li>Full system access</li>
                      <li>Manage scholarships and users</li>
                      <li>View analytics</li>
                    </ul>
                  )}
                  {user?.role?.toLowerCase() === "moderator" && (
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1 ml-2">
                      <li>Review applications</li>
                      <li>Moderate content</li>
                    </ul>
                  )}
                  {(user?.role?.toLowerCase() === "student" || !user?.role) && (
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1 ml-2">
                      <li>Apply for scholarships</li>
                      <li>Track applications</li>
                      <li>Add to wishlist</li>
                    </ul>
                  )}
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
