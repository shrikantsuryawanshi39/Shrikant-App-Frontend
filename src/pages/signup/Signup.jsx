import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const { onSignup, formError } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const password = watch("password");

  // Validation & messages for form fields [Start]
  const fullnameValidation = { required: "Fullname is required" };
  const emailValidation = {
    required: "Email is required",
    pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address", },
  };
  const orgNameValidation = { required: "Organization Name is required" };
  const orgDescriptionValidation = {
    required: "Description is required",
    minLength: { value: 10, message: "Min 10 characters" },
    maxLength: { value: 100, message: "Max 100 characters" },
  };
  const passwordValidation = {
    required: "Password is required",
    minLength: { value: 6, message: "Min 6 characters" },
  };
  const confirmPasswordValidation = (password) => ({
    required: "Confirm your password",
    validate: (value) => value === password || "Passwords do not match",
  });
  // Validation & messages for form fields [End]

  const onSubmit = async (data) => {
    const payload = {
      name: data.fullname,
      email: data.email,
      password: data.password,
      orgName: data.orgName,
      orgDescription: data.orgDescription,
    };
    await onSignup(payload, reset, navigate);
  };

  return (
    <div className="max-w-[440px] px-5 flex justify-center items-center mx-auto h-vh text-black">
      <div className="bg-white shadow-[0_0_15px_rgba(0,0,0,0.2)]  w-[27rem] mx-auto my-12 rounded-md border border-gray-600">
        <div className="grid grid-cols-2">
          <div className="text-lg font-semibold pt-2 pb-2 pl-5">Sign Up</div>
        </div>
        <div className="bg-[#cfd1d4] h-px mb-2 w-full" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-5 py-2 w-full">
          {/* Fullname */}
          <div className="mb-3">
            <label
              htmlFor="fullname"
              className="block text-sm font-medium mb-1">
              Fullname
            </label>
            <input
              id="fullname"
              type="text"
              placeholder="Fullname"
              {...register("fullname", fullnameValidation)}
              className="bg-gray-100 border border-gray-300 rounded-md w-full px-2 py-2 text-sm"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullname.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", emailValidation)}
              className="bg-gray-100 border border-gray-300 rounded-md w-full px-4 py-2 text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Organization Name */}
          <div className="mb-3">
            <label
              htmlFor="orgName"
              className="block text-sm font-medium mb-1">
              Organization Name
            </label>
            <input
              id="orgName"
              type="text"
              placeholder="Organization Name"
              {...register("orgName", orgNameValidation)}
              className="bg-gray-100 border border-gray-300 rounded-md w-full px-4 py-2 text-sm"
            />
            {errors.orgName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.orgName.message}
              </p>
            )}
          </div>

          {/* Organization Description */}
          <div className="mb-3">
            <label
              htmlFor="orgDescription"
              className="block text-sm font-medium mb-1">
              Organization Description
            </label>
            <textarea
              id="orgDescription"
              placeholder="Describe your organization"
              {...register("orgDescription", orgDescriptionValidation)}
              className="bg-gray-100 border border-gray-300 rounded-md w-full px-4 py-2 text-sm"
            />
            {errors.orgDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.orgDescription.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", passwordValidation)}
              className="bg-gray-100 border border-gray-300 rounded-md w-full px-4 py-2 text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              {...register(
                "confirmPassword",
                confirmPasswordValidation(password)
              )}
              className="bg-gray-100 border border-gray-300 rounded-md w-full px-4 py-2 text-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-neutral-950 text-white font-semibold rounded-md w-full py-2 hover:bg-neutral-800 transition-all duration-300 cursor-pointer">
            Sign Up
          </button>

          {/* Form Error */}
          {formError && (
            <p className="text-red-500 text-sm mt-2 text-center w-full">
              {formError}
            </p>
          )}
        </form>

        <div className="text-center pb-3">
          <p>
            Already have an account?{" "}
            <NavLink
              to="/Login"
              className="text-blue-600 hover:underline">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
