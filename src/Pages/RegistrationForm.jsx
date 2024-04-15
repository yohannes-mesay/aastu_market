import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profile: null,
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    sex: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    phone: "",
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordRestrictionError, setPasswordRestrictionError] =
    useState(false);
  const [isError, setIsError] = useState(false);
  const { register, error } = useAuth();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "confirmPassword") {
      setPasswordMatchError(value !== formData.password);
    }

    if (name === "email") {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setFormErrors({
        ...formErrors,
        email: isValidEmail ? "" : "Please enter a valid email address",
      });
    }

    if (name === "phone") {
      const isValidPhone = /^\d{10}$/.test(value);
      setFormErrors({
        ...formErrors,
        phone: isValidPhone ? "" : "Please enter a valid 10-digit Ethiopian phone number",
      });
    }

    if (name === "password") {
      const isValidPassword =
      /^.{8,}$/.test(value);

      setPasswordRestrictionError(!isValidPassword);
    }

    if (name === "profile" && files.length > 0) {
      setFormData({ ...formData, profile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    try {
      const { confirmPassword, ...formDataWithoutConfirm } = formData;

      const registeredUser = await register(formDataWithoutConfirm);
      console.log("formData", formDataWithoutConfirm);

      if (!registeredUser) {
        setIsError(true);
        throw new error("Registration failed");
      }
      if (registeredUser) {
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  // Function to check if there are any validation errors
const hasErrors = () => {
  return (
    formErrors.email !== "" ||
    formErrors.phone !== "" ||
    passwordMatchError ||
    passwordRestrictionError
  );
};


  return (
    <div className="bg-gray-100 text-gray-800 py-12 px-10 md:px-20">
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4"
          >
            <h2 className="text-2xl font-bold text-center mb-4">
              Sign Up
                </h2>

            <label
              className="block text-gray-700 text-md font-semibold mb-2"
              htmlFor="profile"
            >
              Profile Picture
            </label>
            <input
              className="input-field border w-full px-4 py-2 focus:border-gray-500 hover:border-gray-500"
              id="profile"
              name="profile"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
            <div className="mb-4">
              <label
                className="block text-gray-700 text-md font-semibold mb-2"
                htmlFor="first_name"
              >
                First Name
              </label>
              <input
                className="input-field border w-full px-4 py-2 focus:border-gray-500 hover:border-gray-500"
                id="first_name"
                name="first_name"
                type="text"
                placeholder="Enter your first name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              {formData.first_name.length > 0 && formErrors.first_name && (
                <p className="text-red-500 text-xs italic mt-1">
                  {formErrors.first_name}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-md font-semibold mb-2"
                htmlFor="last_name"
              >
                Last Name
              </label>
              <input
                className="input-field border w-full px-4 py-2"
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Enter your last name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
              {formData.last_name.length > 0 && formErrors.last_name && (
                <p className="text-red-500 text-xs italic mt-1">
                  {formErrors.last_name}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-md font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="input-field border w-full px-4 py-2"
                id="email"
                name="email"
                type="email"
                placeholder="example@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs italic">
                  {formErrors.email}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-md font-semibold mb-2"
                htmlFor="bio"
              >
                Bio
              </label>
              <input
                className="input-field border w-full px-4 py-2"
                id="bio"
                name="bio"
                type="text"
                placeholder="Enter your bio"
                value={formData.bio}
                onChange={handleChange}
                
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-md font-semibold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="input-field border w-full px-4 py-2"
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-md font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="input-field border w-full px-4 py-2"
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {passwordRestrictionError && (
                <p className="text-red-500 text-xs italic mt-1">
                  Password must be at least 8 characters long 
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-md font-semibold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="input-field border w-full px-4 py-2"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {passwordMatchError && (
                <p className="text-red-500 text-xs italic mt-1">
                  Password must match
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-md font-semibold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="input-field border w-full px-4 py-2"
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {formErrors.phone && (
                <p className="text-red-500 text-xs italic">
                  {formErrors.phone}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-md font-semibold mb-2"
                htmlFor="sex"
              >
                Gender
              </label>
              <div className="flex">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="sex"
                    value="M"
                    className="mr-1"
                    onChange={handleChange}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="F"
                    className="mr-1"
                    onChange={handleChange}
                  />{" "}
                  Female
                </label>
              </div>
              <span>
                {isError ? (
                  <p className=" text-red-400 text-xs">{error}</p>
                ) : null}
              </span>
            </div>
            <p className="text-md text-gray-600 text-center mb-6">
              Already have an account?{" "}
              <a className="text-blue-500 hover:text-blue-700" href="/signin">
                Sign In
              </a>
            </p>

            <button
  type="submit"
  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${hasErrors() ? "cursor-not-allowed opacity-50" : ""}`}
  disabled={hasErrors()}
>
  Sign Up
</button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
