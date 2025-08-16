import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react"; // for password toggle icons
import { createAdmin } from "../api/adminApi";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";

const Signup = () => {
    const navigate= useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, role: "admin" };
      const res = await createAdmin(payload);
      if(res)
      {
        toast.success(res?.data?.message || "Admin is created")
        reset();
        navigate("/login");
      }
    } catch(error) {
        toast.error(
          error.response?.data?.error || "Something went wrong. Try again."
        );
    }

    
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col justify-center items-center py-10 h-screen">
        <img src="/tawk-logo.png" alt="logo" className="w-28 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create a completely free account
        </h2>

        {/* signup form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-5"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-green-200 focus:border-green-200 outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-green-200 focus:border-green-200 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="block w-full border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-green-200 focus:border-green-200 outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2.5 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up for free
          </button>
        </form>
        <h2>
          Already have an account?{" "}
          <span className=" text-sm text-green-600">
            <Link to="/login">Return to Sign In</Link>
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Signup;
