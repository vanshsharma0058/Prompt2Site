import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Plus, LayoutDashboard, Globe, Home } from "lucide-react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">

      {/* NAVBAR */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 
        bg-white/5 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-lg border border-white/10 hover:bg-white/10 transition"
            >
              <Home size={16} />
            </button>

            <h1 className="text-lg font-semibold flex items-center gap-2">
              <LayoutDashboard size={20} />
              Dashboard
            </h1>
          </div>

          {/* Right */}
          <Link to="/generate">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg 
              bg-linear-to-r from-purple-600 to-blue-600 
              hover:scale-105 transition shadow-lg shadow-purple-900/30"
            >
              <Plus size={18} />
              New Website
            </button>
          </Link>
        </div>
      </motion.div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <p className="text-zinc-400 text-lg">Welcome back</p>
          <h1 className="text-4xl font-bold mt-1">
            {userData?.user?.name}
          </h1>

          <p className="text-zinc-500 mt-2">
            Ready to build something amazing today?
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <p className="text-zinc-400">Projects</p>
              <Globe size={20} />
            </div>

            <h2 className="text-3xl font-bold mt-3">0</h2>

            <p className="text-sm text-zinc-500 mt-1">
              Websites generated
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <p className="text-zinc-400">AI Generations</p>

            <h2 className="text-3xl font-bold mt-3">0</h2>

            <p className="text-sm text-zinc-500 mt-1">
              Prompts used
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <p className="text-zinc-400">Plan</p>

            <h2 className="text-xl font-semibold mt-3">
              Free Tier
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Upgrade anytime
            </p>
          </motion.div>

        </div>

        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <h2 className="text-xl font-semibold mb-6">
            Recent Projects
          </h2>

          <div className="text-zinc-400 text-sm">
            No websites generated yet.

            <div className="mt-4">
              <Link to="/generate">
                <button className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition">
                  Create your first website
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;