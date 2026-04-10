import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // 🧠 Simple Validation
  const validate = () => {
    let newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const { data } = await axios.post(
          `${serverUrl}/api/auth/login`,
          { email: form.email, password: form.password },
          { withCredentials: true },
        );
        dispatch(setUserData(data));
        toast.success("User logging in Successfully! 🎉");
        navigate("/");
      } catch (err) {
        const message = err.response?.data?.message || "Server Error";
        toast.error(message);
        setErrors({ general: message });
      }
    }
  };

  //google authentication using firebase
  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google`,
        {
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
          authProvider: "google",
        },
        { withCredentials: true },
      );
      dispatch(setUserData(data));
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Server Error";
      setErrors({ general: message });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="relative z-10 w-full 
    max-w-sm sm:max-w-md lg:max-w-lg
    p-6 sm:p-8 lg:p-10 
    rounded-2xl 
    bg-white/5 backdrop-blur-xl 
    border border-white/10 
    shadow-2xl shadow-purple-900/20"
      >
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-gray-400 text-center mb-6 sm:mb-8 text-xs sm:text-sm">
          Login to continue with{" "}
          <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Prompt2Site
          </span>
        </p>

        {errors.general && (
          <p className="text-red-400 text-sm text-center mb-3">
            {errors.general}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Email */}
          <div>
            <label className="text-xs sm:text-sm text-gray-400 mb-2 block">
              Email
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-4.5 w-4 h-4 text-gray-500" />
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl 
            bg-white/5 border border-white/10 
            focus:outline-none focus:border-purple-500 
            text-white placeholder-gray-500 text-sm sm:text-base"
              />
            </div>

            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs sm:text-sm text-gray-400 mb-2 block">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl 
            bg-white/5 border border-white/10 
            focus:outline-none focus:border-purple-500 
            text-white placeholder-gray-500 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 rounded-xl 
        bg-linear-to-r from-purple-600 to-blue-600 
        hover:scale-[1.02] transition duration-300 
        shadow-lg shadow-purple-700/30 text-sm sm:text-base"
          >
            Log In 🚀
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5 sm:my-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="px-3 text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Google Button */}
        <button
          className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-white text-black font-medium hover:scale-[1.02] transition"
          onClick={handleGoogleAuth}
        >
          <img
            src="https://www.figma.com/community/resource/29e2e9ca-07f7-49d5-8b2a-09d7e6328b98/thumbnail"
            className="w-4 h-4"
            alt="icon"
          />
          Continue with Google
        </button>

        {/* Signup */}
        <p className="text-xs sm:text-sm text-gray-400 text-center mt-5 sm:mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-400 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
