import { Link, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { Coins, Menu, X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../Redux/userSlice";
import toast from "react-hot-toast";
import { useRef, useEffect } from "react";
const Navbar = () => {
  const dropdownRef = useRef(null);
  const { userData } = useSelector((state) => state.user);
  const [openProfile, setOpenProfile] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };

    if (openProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openProfile]);

  useEffect(() => {
    document.body.style.overflow = openMobile ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openMobile]);

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      toast.success("User Logout Successfully! 🎉");
      dispatch(setUserData(null));
      setOpenProfile(false);
      setOpenMobile(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 
      bg-white/5 backdrop-blur-2xl 
      border-b border-white/10 
      shadow-lg shadow-purple-900/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl  font-semibold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:brightness-125 transition">
          Prompt2Site
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex gap-8 text-gray-300 ">
          <Link to="/" className="relative group hover:text-white transition">
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-linear-to-r from-purple-400 to-blue-400 transition-all group-hover:w-full"></span>
          </Link>

          <Link
            to="/pricing"
            className="relative group hover:text-white transition"
          >
            Pricing
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-linear-to-r from-purple-400 to-blue-400 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/docs"
            className="relative group hover:text-white transition"
          >
            Docs
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-linear-to-r from-purple-400 to-blue-400 transition-all group-hover:w-full"></span>
          </Link>
          {userData && (
            <Link
              to="/dashboard"
              className="relative group hover:text-white transition"
            >
              Dashboard
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-linear-to-r from-purple-400 to-blue-400 transition-all group-hover:w-full"></span>
            </Link>
          )}
          {userData && (
            <Link
              to="/payment-history"
              className="relative group hover:text-white transition"
            >
              Payment-history
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-linear-to-r from-purple-400 to-blue-400 transition-all group-hover:w-full"></span>
            </Link>
          )}
        </div>

        <div className=" flex items-center gap-4">
          {userData && (
            <div
              onClick={() => navigate("/pricing")}
              className="hidden
       md:flex items-center gap-2 
      px-3 py-1.5 
      rounded-full 
      bg-linear-to-r from-purple-500/10 to-blue-500/10 
      backdrop-blur-lg
      border border-white/10
      text-sm font-medium text-white
      shadow-md shadow-purple-900/20
      hover:scale-105 transition-all duration-300
    "
            >
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-purple-600/20">
                <Coins className="w-4 h-4 text-purple-400" />
              </div>
              {userData && (
                <span className="tracking-wide">{userData?.user.credits}</span>
              )}
            </div>
          )}

          {/* CTA Button */}
          {!userData ? (
            <Link to="/login">
              {" "}
              <button
                className="hidden md:inline-flex px-5 py-2 rounded-lg 
        bg-linear-to-r from-purple-600 to-blue-600 
        hover:scale-105 transition duration-300 
        shadow-xl shadow-purple-700/30 cursor-pointer"
              >
                Get Started
              </button>
            </Link>
          ) : (
            <div className="relative">
              <button
                className="flex items-center"
                onClick={() => setOpenProfile(!openProfile)}
              >
                <img
                  src={
                    userData.user.avatar ||
                    `https://ui-avatars.com/api/?name=${userData.user.name}&background=random&color=fff&size=128`
                  }
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full border border-white/20 object-cover"
                />
              </button>

              <AnimatePresence>
                {openProfile && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="
        absolute right-0 mt-4 w-64 z-50
        rounded-2xl
        bg-linear-to-b from-[#111827]/95 to-[#0b0f1a]/95
        backdrop-blur-2xl
        border border-white/10
        shadow-[0_10px_40px_rgba(0,0,0,0.6)]
        overflow-hidden
      "
                  >
                    {/* Profile Header */}
                    <div className="px-5 py-4 border-b border-white/10 text-center">
                      <p className="text-sm font-semibold text-white truncate">
                        {userData.user.name}
                      </p>
                      <p className="text-xs text-zinc-400 truncate">
                        {userData.user.email}
                      </p>

                      <div className="mt-2 inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {userData.user.plan} Plan
                      </div>
                    </div>

                    {/* Credits Section */}
                    <div
                      onClick={() => navigate("/pricing")}
                      className="px-5 py-3 border-b border-white/10 flex items-center justify-between"
                    >
                      <span className="text-sm text-zinc-300">Credits</span>

                      <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                        <Coins className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-white">
                          {userData.user.credits}
                        </span>
                      </div>
                    </div>

                    {/* Navigation Links */}

                    {/* Logout */}
                    <div className="border-t border-white/10">
                      <button
                        onClick={handleLogout}
                        className="
            w-full px-5 py-3 text-left text-sm
            text-red-400 hover:bg-red-500/10
            transition-all duration-200
          "
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="relative">
            <button
              className="md:hidden text-white flex items-center"
              onClick={() => setOpenMobile(!openMobile)}
            >
              {openMobile ? <X /> : <Menu />}
            </button>

            {/* Mobile menu */}

            <AnimatePresence>
              {openMobile && (
                <motion.div
                  ref={dropdownRef}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="md:hidden absolute right-0 top-7 mt-4 w-64 z-50 px-3 py-2
        rounded-2xl
        bg-linear-to-b from-[#111827]/95 to-[#0b0f1a]/95
        backdrop-blur-2xl
        border border-white/10
        shadow-[0_10px_40px_rgba(0,0,0,0.6)]
        overflow-hidden"
                >
                  <div className="flex flex-col  text-gray-300">
                    {/* Navigation Links */}
                    <div>
                      {[
                        { name: "Home", path: "/" },
                        { name: "Pricing", path: "/pricing" },
                        { name: "Docs", path: "/docs" },
                      ].map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setOpenMobile(false)}
                          className="
              block px-5 py-2.5 text-sm text-zinc-300
              hover:bg-white/5 hover:text-white
              transition-all duration-200 border-b border-white/10
            "
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    {userData ? (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setOpenMobile(false)}
                          className="
              px-5  py-2.5 text-sm text-zinc-300
              hover:bg-white/5 hover:text-white
              transition-all duration-200 border-b border-white/10
            "
                        >
                          Dashboard
                        </Link>
                        {userData && (
                          <Link
                            to="/payment-history"
                            onClick={() => setOpenMobile(false)}
                            className=" px-5  py-2.5 text-sm text-zinc-300
              hover:bg-white/5 hover:text-white
              transition-all duration-200 border-b border-white/10"
                          >
                            Payment-history
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="py-2.5 text-red-400 bg-red-500/10 rounded-b-lg
            transition-all duration-200"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setOpenMobile(false)}
                        className="px-5 py-2 rounded-b-lg
        bg-linear-to-r from-purple-600 to-blue-600 
        hover:scale-105 transition duration-300 
        shadow-xl shadow-purple-700/30 text-center cursor-pointer"
                      >
                        Get Started
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Premium Glow Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
    </motion.div>
  );
};

export default Navbar;
