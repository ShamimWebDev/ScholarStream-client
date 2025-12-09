import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p>Welcome back, {user?.name || "User"}!</p>
      {/* Profile details here */}
    </div>
  );
};

export default Profile;
