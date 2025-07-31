import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const {
    credentialsValidated,
    orgs,
    formError,
    validate,
    login,
  } = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ shouldUnregister: false });

  // Validation & messages for form fields [Start]
  const emailValidation = {
    required: "Email is required",
    pattern: { value: /\S+@\S+\.\S+/, message: "Email is invalid", },
  };
  const passwordValidation = {
    required: "Password is required",
    minLength: { value: 6, message: "Password must be at least 6 characters", },
  };
  const orgIdValidation = {
    required: "Organization is required",
    min: { value: 1, message: "Org ID must be positive" },
  };
  // Validation & messages for form fields [End]

  const submitHandler = async () => {
    const values = getValues();
    if (credentialsValidated) {
      await login(values);
    } else {
      await validate(values);
    }
  };

  return (
    <div className="max-w-[440px] px-5 flex justify-center items-center mx-auto h-screen text-black">
      <div className="w-full border border-gray-600 shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-md p-5 hover:backdrop-blur-sm transition ease-in duration-300">
        <div className="h-[90px] text-2xl font-semibold flex items-center justify-center">
          <span>Welcome back</span>
        </div>
        <p className="flex items-center justify-center -mt-5 mb-5 text-sm text-gray-700">
          Please enter your details to sign in.
        </p>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(submitHandler)}>
          {!credentialsValidated && (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email..."
                  {...register("email", emailValidation)}
                  className="w-full border bg-gray-100 border-gray-300 rounded-md px-4 py-3 text-sm placeholder-gray-500 text-black"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password", passwordValidation)}
                  className="w-full border bg-gray-100 border-gray-300 rounded-md px-4 py-3 text-sm placeholder-gray-500 text-black"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
            </>
          )}

          {credentialsValidated && (
            <div>
              <label htmlFor="orgId" className="block text-sm font-medium mb-1">
                Organization
              </label>
              <select
                id="orgId"
                {...register("orgId", orgIdValidation)}
                className="w-full border bg-gray-100 border-gray-300 rounded-md px-4 py-3 text-sm text-black">
                <option value="">Select your organization</option>
                {orgs.map((org) => (
                  <option key={org.orgId} value={org.orgId}>
                    {org.orgName}
                  </option>
                ))}
              </select>
              {errors.orgId && (
                <p className="text-red-500 text-sm mt-1">{errors.orgId.message}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[45px] bg-neutral-950 hover:bg-neutral-800 border border-gray-600 text-white text-lg font-medium rounded-md transition ease-in duration-300 cursor-pointer">
            {credentialsValidated ? "Login" : "Validate"}
          </button>

          {formError && (
            <p className="text-red-500 text-sm text-center">{formError}</p>
          )}

          <div className="text-center text-sm">
            Not a member?{" "}
            <NavLink to="/Signup" className="text-blue-600 hover:underline">
              Signup now
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;