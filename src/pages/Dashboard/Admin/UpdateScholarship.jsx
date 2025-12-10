import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

const UpdateScholarship = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [scholarship, setScholarship] = useState(null);

  useEffect(() => {
    axios
      .get(`/scholarships/${id}`)
      .then((res) => {
        setScholarship(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load scholarship");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedScholarship = {
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
    };

    try {
      const res = await axios.patch(`/scholarships/${id}`, updatedScholarship);
      console.log("✅ Scholarship updated:", res.data);
      alert("Scholarship updated successfully");
      navigate("/dashboard/manage-scholarships");
    } catch (error) {
      console.error("❌ Failed to update scholarship:", error);
      console.error("❌ Error response:", error.response?.data);
      const errorMsg = error.response?.data?.message || error.message;
      alert(`Failed to update scholarship: ${errorMsg}`);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!scholarship) return <div>Scholarship not found</div>;

  // Format date for input (YYYY-MM-DD)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl font-bold mb-6">Update Scholarship</h2>
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
            defaultValue={scholarship.scholarshipName}
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
            defaultValue={scholarship.universityName}
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
            defaultValue={scholarship.universityImage}
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
            defaultValue={scholarship.universityCountry}
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
            defaultValue={scholarship.universityCity}
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
            defaultValue={scholarship.universityWorldRank}
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
            defaultValue={scholarship.subjectCategory}
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
            defaultValue={scholarship.scholarshipCategory}
            className="select select-bordered"
            required
          >
            <option value="Full Fund">Full Fund</option>
            <option value="Partial">Partial</option>
            <option value="Self-fund">Self-fund</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Degree</span>
          </label>
          <select
            name="degree"
            defaultValue={scholarship.degree}
            className="select select-bordered"
            required
          >
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
            defaultValue={scholarship.tuitionFees || 0}
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
            defaultValue={scholarship.applicationFees}
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
            defaultValue={scholarship.serviceCharge}
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
            defaultValue={formatDate(scholarship.applicationDeadline)}
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control md:col-span-2 mt-6 flex flex-row gap-4">
          <button type="submit" className="btn btn-primary flex-1">
            Update Scholarship
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard/manage-scholarships")}
            className="btn btn-outline flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateScholarship;
