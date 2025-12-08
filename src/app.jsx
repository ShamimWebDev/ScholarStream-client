import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllScholarships from "./pages/AllScholarships";
import ScholarshipDetails from "./pages/ScholarshipDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import Profile from "./pages/Dashboard/Profile";
import AddScholarship from "./pages/Dashboard/Admin/AddScholarship";
import ManageUsers from "./pages/Dashboard/Admin/ManageUsers";
import MyApplications from "./pages/Dashboard/Student/MyApplications";
import ManageApplications from "./pages/Dashboard/Moderator/ManageApplications";
import ManageScholarships from "./pages/Dashboard/Admin/ManageScholarships";
import Analytics from "./pages/Dashboard/Admin/Analytics";
import ManageReviews from "./pages/Dashboard/Moderator/ManageReviews";
import MyReviews from "./pages/Dashboard/Student/MyReviews";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import PrivateRoute from "./components/common/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
// import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Main Layout Routes */}
          <Route
            path="*"
            element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/scholarships" element={<AllScholarships />} />
                    <Route
                      path="/scholarship/:id"
                      element={<ScholarshipDetails />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route
                      path="/checkout/:id"
                      element={
                        <PrivateRoute>
                          <Checkout />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/payment-success"
                      element={<PaymentSuccess />}
                    />
                    <Route path="/payment-failed" element={<PaymentFailed />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            }
          />

          {/* Dashboard Layout Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            {/* Admin Routes */}
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="add-scholarship" element={<AddScholarship />} />
            <Route
              path="manage-scholarships"
              element={<ManageScholarships />}
            />
            <Route path="analytics" element={<Analytics />} />
            {/* Moderator Routes */}
            <Route
              path="manage-applications"
              element={<ManageApplications />}
            />
            <Route path="manage-reviews" element={<ManageReviews />} />
            {/* Student Routes */}
            <Route path="my-applications" element={<MyApplications />} />
            <Route path="my-reviews" element={<MyReviews />} />
            {/* Common */}
            <Route path="profile" element={<Profile />} />
            <Route index element={<Profile />} /> {/* Default to profile */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
