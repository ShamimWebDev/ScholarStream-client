/**
 * Dashboard Layout Component
 * Responsive sidebar navigation with mobile drawer
 */

import React, { useContext, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const role = user?.role || "student";

  const NavLinkItem = ({ to, icon, children, end = false }) => (
    <NavLink
      to={to}
      end={end}
      onClick={() => setIsSidebarOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
          isActive
            ? "bg-gray-100 text-blue-600"
            : "text-gray-600 hover:bg-gray-50"
        }`
      }
    >
      <span>{icon}</span>
      <span>{children}</span>
    </NavLink>
  );

  const SidebarContent = () => (
    <>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">ScholarStream</h2>
        <p className="text-sm text-gray-500">Welcome back!</p>
      </div>

      <nav className="px-4 space-y-1">
        <NavLinkItem to="/dashboard" icon="📊" end>
          Dashboard
        </NavLinkItem>

        {/* Student Links */}
        {role === "student" && (
          <>
            <NavLinkItem to="/dashboard/my-applications" icon="📄">
              My Applications
            </NavLinkItem>
            <NavLinkItem to="/dashboard/my-reviews" icon="⭐">
              My Reviews
            </NavLinkItem>
            <NavLinkItem to="/scholarships" icon="🎓">
              All Scholarships
            </NavLinkItem>
          </>
        )}

        {/* Moderator Links */}
        {role === "moderator" && (
          <>
            <NavLinkItem to="/dashboard/manage-applications" icon="📋">
              Manage Applications
            </NavLinkItem>
            <NavLinkItem to="/dashboard/manage-reviews" icon="⭐">
              Manage Reviews
            </NavLinkItem>
          </>
        )}

        {/* Admin Links */}
        {role === "admin" && (
          <>
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase mt-6">
              Administration
            </div>
            <NavLinkItem to="/dashboard/add-scholarship" icon="➕">
              Add Scholarship
            </NavLinkItem>
            <NavLinkItem to="/dashboard/manage-scholarships" icon="⚙️">
              Manage Scholarships
            </NavLinkItem>
            <NavLinkItem to="/dashboard/manage-users" icon="👥">
              Manage Users
            </NavLinkItem>
            <NavLinkItem to="/dashboard/manage-applications" icon="📋">
              Manage Applications
            </NavLinkItem>
            <NavLinkItem to="/dashboard/manage-reviews" icon="⭐">
              Manage Reviews
            </NavLinkItem>
            <NavLinkItem to="/dashboard/analytics" icon="📊">
              Analytics
            </NavLinkItem>
          </>
        )}

        {/* Common Links */}
        <div className="border-t border-gray-200 mt-6 pt-4">
          <NavLinkItem to="/dashboard/profile" icon="👤">
            My Profile
          </NavLinkItem>
          <NavLinkItem to="/" icon="🏠">
            Home
          </NavLinkItem>
          <button
            onClick={() => {
              logout();
              setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white shadow-sm fixed h-full overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-lg overflow-y-auto">
          <SidebarContent />
        </aside>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
                  Dashboard
                </h1>
                <p className="text-xs lg:text-sm text-gray-500 hidden sm:block">
                  Welcome back! Here's what's happening.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <span className="text-xl">🔔</span>
              </button>
              <div className="flex items-center gap-2 lg:gap-3">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/40"}
                  alt={user?.displayName || "User"}
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
                />
                <span className="text-xs lg:text-sm font-medium text-gray-700 hidden sm:block">
                  {user?.displayName || "User"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
