import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      return;
    }
    try {
      const res = await login(formData.username, formData.password);
      if (!res) {
        console.log("er", error);
        setIsError(true);
      }
      if(res){
        navigate("/");
      }
    } catch (err) {
      console.log("err", error);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white shadow-lg rounded-lg mt-32 mb-40">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Sign In
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-md font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 p-3 w-full border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-md font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-3 w-full border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span>
            {isError ? <p className=" text-red-400 text-xs">{error}</p> : null}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <Link to="#" className="text-md text-blue-600 hover:underline">
            Forgot password?
          </Link>
          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Sign In
          </button>
        </div>
      </form>

      {/* Create Account */}
      <p className="mt-4 text-gray-600 text-center text-md">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline"
          href="/registration"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
