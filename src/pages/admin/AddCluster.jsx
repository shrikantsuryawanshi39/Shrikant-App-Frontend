import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useClusterContext } from "../../context/ClusterContext";
const AddCluster = () => {

  const { addCluster, formError, successMessage } = useClusterContext();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // Validation & messages for form fields [Start]
  const clusterNameValidation = {
    required: "Cluster Name is required",
    minLength: {
      value: 8,
      message: "Cluster Name must be at least 8 characters",
    },
  };
  const descriptionValidation = {
    required: "Description is required",
    minLength: {
      value: 10,
      message: "Minimum 10 characters required",
    },
    maxLength: {
      value: 100,
      message: "Maximum 100 characters allowed",
    },
  };
  // Validation & messages for form fields [End]

  const onSubmit = async () => {
    const data = getValues();
    await addCluster(data, reset);
  }

  return (
    <div className="px-4">
      <div className="w-full h-screen max-w-3xl text-black flex flex-col items-center justify-center mx-auto my-10 p-5 sm:p-10 md:p-16">
        {/* Form Success message  */}
        {successMessage && (
          <p className="text-green-600 text-md m-2 text-center w-full">
            {successMessage}
          </p>
        )}
        <div className="w-full sm:w-md border border-gray-400 p-5 sm:p-6 rounded-lg shadow-md bg-white">
          <h1 className="text-xl sm:text-2xl font-bold mb-5 text-center">
            Add Cluster
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 text-sm">
            {/* Cluster Name */}
            <div>
              <label
                htmlFor="clusterName"
                className="block font-medium mb-1">
                Cluster Name
              </label>
              <input
                id="clusterName"
                type="text"
                placeholder="Full Name"
                {...register("clustername", clusterNameValidation)}
                className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-sm"
              />
              {errors.clustername && (
                <p className="text-red-500 mt-1">
                  {errors.clustername.message}
                </p>
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
                className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-sm"
              />
              {errors.description && (
                <p className="text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer w-full transition-all duration-300">
              Add Cluster
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

export default AddCluster;
