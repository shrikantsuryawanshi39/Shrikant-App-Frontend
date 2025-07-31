import React from "react";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../context/UserContext";

const AddUser = () => {
  const { formError, addUser, successMessage } = useUserContext();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  // Validation & messages for form fields [Start]
  const nameValidation = {
    required: "Name is required",
    minLength: { value: 8, message: "Name must be at least 8 characters" },
  };
  const emailValidation = {
    required: "Email is required",
    pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" },
  };
  const typeValidation = { required: "User type is required" };
  const passwordValidation = {
    required: "Password is required",
    minLength: { value: 6, message: "Password must be at least 6 characters" },
  };
  const confirmPasswordValidation = (password) => ({
    required: "Confirm Password is required",
    validate: (value) => value === password || "Passwords do not match",
  });
  const descriptionValidation = {
    required: "Description is required",
    minLength: { value: 10, message: "Min 10 characters" },
    maxLength: { value: 100, message: "Max 100 characters" },
  };
  // Validation & messages for form fields [End]

  const onSubmit = async (data) => {
    await addUser(data, reset);
  };

  return (
    <div className="px-4">
      <div className="text-black flex flex-col items-center justify-center mx-auto my-10 p-5 sm:p-10 md:p-16">
        {/* Form Success message  */}
        {successMessage && (
          <p className="text-green-600 text-md m-2 text-center w-full">
            {successMessage}
          </p>
        )}
        <div className="w-full max-w-md border border-gray-400 p-5 sm:p-6 rounded-lg shadow-md bg-white">
          <h1 className="text-xl sm:text-2xl font-bold mb-5 text-center">
            Add User
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-sm">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                {...register("name", nameValidation)}
                className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-sm"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block font-medium mb-1">
                Email Id
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                {...register("email", emailValidation)}
                className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-sm"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Type */}
            <div>
              <label
                htmlFor="type"
                className="block font-medium mb-1">
                Type
              </label>
              <select
                id="type"
                defaultValue=""
                {...register("type", typeValidation)}
                className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-sm">
                <option
                  value=""
                  disabled>
                  Select User Type
                </option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </select>
              {errors.type && (
                <p className="text-red-500">{errors.type.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password", passwordValidation)}
                className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-sm"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block font-medium mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                {...register(
                  "confirmPassword",
                  confirmPasswordValidation(watch("password"))
                )}
                className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-sm"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="Enter Description"
                {...register("description", descriptionValidation)}
                className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-sm"></textarea>
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer w-full transition-all duration-300">
              Add User
            </button>

            {/* Form Error */}
            {formError && (
              <p className="text-red-500 text-sm mt-2 text-center w-full">
                {formError}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
