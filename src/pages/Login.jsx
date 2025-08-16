import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { loginAdmin } from "../api/adminApi";
import { toast } from "sonner";

const Login = () => {
      const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await loginAdmin(data);

      // save token in localStorage
      localStorage.setItem("token", res.data.token);
    //   localStorage.setItem("admin", JSON.stringify(res.data.user));

      toast.success("Admin login successful!");
      reset();
      navigate("/"); // redirect after login
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.error || "Invalid login credentials");
    }
  };
  return (
    <div className="max-w-3xl mx-auto ">
      <div className="flex flex-col justify-center items-center py-10 h-screen">
        <img src="/tawk-logo.png" alt="logo" className="w-28 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Log in to your tawk.to account
        </h2>

        {/* signup form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-5"
        >
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
            Sign In
          </button>
        </form>
        <h2>
          Don't have an account?{" "}
          <span className=" text-sm text-green-600">
            <Link to="/signup"> Create free account</Link>
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Login;
