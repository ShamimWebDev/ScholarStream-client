import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const AddScholarship = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const scholarship = {
      scholarshipName: form.scholarshipName.value,
      universityName: form.universityName.value,
      universityImage: form.universityImage.value,
      universityCountry: form.universityCountry.value,
      universityCity: form.universityCity.value,
      universityWorldRank: parseInt(form.universityWorldRank.value),
      subjectCategory: form.subjectCategory.value,
      scholarshipCategory: form.scholarshipCategory.value,
      degree: form.degree.value,
      tuitionFees: parseInt(form.tuitionFees.value || 0),
      applicationFees: parseInt(form.applicationFees.value),
      serviceCharge: parseInt(form.serviceCharge.value),
      applicationDeadline: form.applicationDeadline.value,
      postedUserEmail: user.email,
      scholarshipPostDate: new Date(),
    };

    try {
      await axios.post("/scholarships", scholarship, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      alert("Scholarship added successfully");
      navigate("/dashboard/manage-scholarships");
    } catch (error) {
      console.error(error);
      alert("Failed to add scholarship");
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl font-bold mb-6">Add Scholarship</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Scholarship Name</span>
          </label>
          <input
            type="text"
            name="scholarshipName"
            placeholder="Scholarship Name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">University Name</span>
          </label>
          <input
            type="text"
            name="universityName"
            placeholder="University Name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">University Image URL</span>
          </label>
          <input
            type="text"
            name="universityImage"
            placeholder="Image URL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Country</span>
          </label>
          <input
            type="text"
            name="universityCountry"
            placeholder="Country"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">City</span>
          </label>
          <input
            type="text"
            name="universityCity"
            placeholder="City"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">World Rank</span>
          </label>
          <input
            type="number"
            name="universityWorldRank"
            placeholder="Rank"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Subject Category</span>
          </label>
          <select
            name="subjectCategory"
            className="select select-bordered"
            required
          >
            <option value="Agriculture">Agriculture</option>
            <option value="Engineering">Engineering</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Scholarship Category</span>
          </label>
          <select
            name="scholarshipCategory"
            className="select select-bordered"
            required
          >
            <option value="Full fund">Full fund</option>
            <option value="Partial">Partial</option>
            <option value="Self-fund">Self-fund</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Degree</span>
          </label>
          <select name="degree" className="select select-bordered" required>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Tuition Fees (Optional)</span>
          </label>
          <input
            type="number"
            name="tuitionFees"
            placeholder="Fees"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Application Fees</span>
          </label>
          <input
            type="number"
            name="applicationFees"
            placeholder="App Fees"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Service Charge</span>
          </label>
          <input
            type="number"
            name="serviceCharge"
            placeholder="Service Charge"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Application Deadline</span>
          </label>
          <input
            type="date"
            name="applicationDeadline"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control md:col-span-2 mt-6">
          <button className="btn btn-primary">Add Scholarship</button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
