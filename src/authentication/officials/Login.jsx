import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useUser } from "../../context/UserContext";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Login() {
  const { loginUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(1); // Default role is admin
  const [dept, setDept] = useState("finance");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    empMobileOrId: "",
    empPassword: "",
    empRole: 1,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRole = (e) => {
    setRole(parseInt(e.target.value));
    setFormData((prevData) => ({ ...prevData, empRole: e.target.value }));
  };

  const handleDept = (e) => {
    setDept(e.target.value);
    setFormData((prevData) => ({ ...prevData, empDept: e.target.value }));
  };

  const handleSubmit = async (e) => {
    // navigate("/pages/civil-attendance-form");
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Extract empId or empMobile from the input field
    const { empMobileOrId, empPassword, empRole } = formData;

    let dataToSend = {};

    if (empMobileOrId) {
      // Check if the input looks like a mobile number or empId
      if (empMobileOrId.length === 10 && /^[0-9]+$/.test(empMobileOrId)) {
        // It's a mobile number, send it as empMobile
        dataToSend = { mobile: empMobileOrId, password: empPassword, role: empRole };
      } else {
        // Otherwise, treat it as empId
        dataToSend = { email: empMobileOrId, password: empPassword, role: empRole };
      }

      try {
        const url = `${SERVER_URL}/api/auth/login/admin`;
        const response = await axios.post(url, dataToSend);

        // if (!response.ok) {
        //   throw new Error("Invalid credentials");
        // }

        const data = response.data;

        // Redirect or perform additional actions upon successful login
        // if (role === "admin" && data.user.role === ADMIN_CODE) {
        // console.log(data.user);
        if (data.user.role === 1) {
          navigate("/pages/admin-dashboard");
        }
        // else if (role === "developer") {
        //   navigate("/pages/developer-attendance-form");
        // } 
        // else if (role === "finance") {
        //   navigate("/pages/dashboard/finance", { state: { data } });
        // } 
        // else if (role === "construction") {
        //   navigate("/pages/construction-dashboard");
        // }
        else {
          // alert("Unauthorized access!");
          throw new Error("Unauthorized access!");
        }


        setSuccess("Login successful!");

        // console.log(data?.user);
        // alert("Login successful!");

        // Save token and role to local storage
        localStorage.setItem("token", data.token);
        loginUser(data.user); // Save user data in context
      } catch (e) {
        alert(e.response?.data?.message || e.message || "Login failed!");
        // setError(err.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <div className="mb-6">
            <label
              htmlFor="mobileOrId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Employee/Vendor ID/Mobile No
            </label>
            <input
              id="mobileOrId"
              name="empMobileOrId" // We only use this field for either empId or empMobile
              value={formData.empMobileOrId}
              onChange={handleChange}
              placeholder="Enter your employee ID or mobile number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle between password and text type
                id="password"
                name="empPassword"
                value={formData.empPassword}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <button
                type="button"
                className="absolute top-2 right-3 text-gray-600"
                onClick={() => setShowPassword((prevState) => !prevState)} // Toggle password visibility
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="dept"
              className=" block text-sm font-medium text-gray-700 mb-2"
            >
              Department
            </label>
            <select
              id="dept"
              name="empDept"
              value={dept}
              onChange={handleDept}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              {/* <option value="admin">Admin</option> */}
              {/* <option value="developer">Developer</option> */}
              {/* <option value="construction">Construction</option> */}
              <option value="finance">Finance</option>
            </select>
          </div>


          <div className="mb-6">
            <label
              htmlFor="role"
              className=" block text-sm font-medium text-gray-700 mb-2"
            >
              Role
            </label>
            <select
              id="role"
              name="empRole"
              value={role}
              onChange={handleRole}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="1">Admin</option>
              <option value="2">Team Leader</option>
              <option value="3">Telecaller</option>
              {/* <option value="developer">Developer</option> */}
              {/* <option value="construction">Construction</option> */}
              {/* <option value="finance">Finance</option> */}
            </select>
          </div>

          <div className="flex items-center justify-center mb-4">
            {loading && (
              <ClipLoader color="#4A90E2" loading={loading} size={50} />
            )}
          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          >
            Login
          </button>
        </form>
        {/* <p className="mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/authentication/sign-up"
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </Link>
        </p>*/}
        <p className="my-2 text-sm text-gray-600 ">
          Didn’t remember password?{" "}
          <Link
            to="/authentication/officials/cons-and-fin-forgot-password"
            className="text-blue-500 hover:underline"
          >
            Forgot here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
