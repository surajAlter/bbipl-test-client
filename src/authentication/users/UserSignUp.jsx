import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const UserSignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    gender: "male",
    dob: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(false);
      return;
    }

    try {
      console.log(formData);
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/signup/user`, formData);
      setSuccess(response.data.message || "Sign up successful!");

      window.location.href = "/authentication/users/user-login";
    } catch (error) {
      // alert(error.response?.data?.message || "Sign up failed!");
      setError(error.response?.data?.message || "Sign up failed!");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">User Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 capitalize">First Name</label>
          <input
            name="firstName"
            value={formData["firstName"]}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder={`Enter First Name`}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 capitalize">Last Name</label>
          <input
            name="lastName"
            value={formData["lastName"]}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder={`Enter Last Name`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 capitalize">Email</label>
          <input
            name="email"
            value={formData["email"]}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder={`Enter Email`}
            required
          />
        </div>
        <div className="mb-4 grid grid-cols-6">
          <label className="col-span-2 text-gray-700 mb-2 capitalize">Country Code</label>
          <label className="col-span-4 text-gray-700 mb-2 capitalize">Mobile</label>
          <input
            name="countryCode"
            value={formData["countryCode"]}
            onChange={handleChange}
            className="col-span-2 border border-gray-300 p-2 rounded"
            placeholder={`Enter Country Code`}
            required
          />
          <input
            type="telephone"
            name="mobile"
            value={formData["mobile"]}
            onChange={handleChange}
            className="col-span-4 border border-gray-300 p-2 rounded"
            placeholder={`Enter Mobile`}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 capitalize">Password</label>
          <input
            type="password"
            name="password"
            value={formData["password"]}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder={`Enter Password`}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 capitalize">Confirm Password</label>
          <input
            name="confirmPassword"
            value={formData["confirmPassword"]}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder={`Confirm Password`}
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-gray-700 mb-2 capitalize">
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            value={formData["gender"]}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 capitalize">Date Of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData["dob"]}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder={`Enter Date Of Birth`}
            required
          />
        </div>

        <div className="flex items-center justify-center mb-4">
          {loading && (
            <ClipLoader color="#4A90E2" loading={loading} size={50} />
          )}
        </div>


        <button
          type="submit"
          className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>
        <p className="my-2 text-sm text-gray-600 ">
          Already have an account?{" "}
          <Link
            to="/authentication/users/user-login"
            className="text-blue-500 hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserSignUp;
