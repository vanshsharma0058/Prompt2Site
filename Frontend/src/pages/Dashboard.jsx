import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Plus,
  LayoutDashboard,
  Globe,
  Home,
  Share,
  Rocket,
  Check,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import toast from "react-hot-toast";
const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPrompts, setTotalPrompts] = useState(0);
  const [copiedId, setCopiedId] = useState("");

  const handleDeploy = async (id) => {
    try {
      const result = await axios.get(`${serverUrl}/api/website/deploy/${id}`, {
        withCredentials: true,
      });
      //to open the url i use window.open and open in new tab
      window.open(`${result.data.url}`, "_blank");
      setWebsites((prev) =>
        prev.map((w) =>
          w._id === id
            ? { ...w, deployed: true, deployUrl: result.data.url }
            : w,
        ),
      );
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      console.error("Deploy error", error);
      toast.error(errMsg);
      setError(errMsg);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAllWebsites = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${serverUrl}/api/website/get-all`, {
          withCredentials: true,
        });
        setWebsites(response.data || []);
        const promptsCount = (response.data || []).reduce((sum, website) => {
          return (
            sum +
            (website.conversation?.filter((msg) => msg.role === "user")
              .length || 0)
          );
        }, 0);
        setTotalPrompts(promptsCount);
        setLoading(false);
      } catch (error) {
        const errMsg =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
        console.error("Get All Website error", error);
        toast.error(errMsg);
        setError(errMsg);
        setLoading(false);
      }
    };
    getAllWebsites();
  }, []);

  const handleCopyId = async (site) => {
    await navigator.clipboard.writeText(site.deployUrl);
    setCopiedId(site._id);
    setTimeout(() => {
      setCopiedId("");
    }, 2000);
    toast.success("URL Copied to clipboard");
  };

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
          <div className="flex gap-2">
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
          <h1 className="text-4xl font-bold mt-1">{userData?.user?.name}</h1>

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

            <h2 className="text-3xl font-bold mt-3">{websites.length}</h2>

            <p className="text-sm text-zinc-500 mt-1">Websites generated</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <p className="text-zinc-400">AI Generations</p>

            <h2 className="text-3xl font-bold mt-3">{totalPrompts}</h2>

            <p className="text-sm text-zinc-500 mt-1">Prompts used</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <p className="text-zinc-400">Plan</p>

            <h2 className="text-xl font-semibold mt-3">
              {userData?.user?.plan || "Free Tier"}
            </h2>

            <p className="text-sm text-zinc-500 mt-1">Upgrade anytime</p>
          </motion.div>
        </div>

        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <h2 className="text-xl font-semibold mb-6">Recent Projects</h2>

          {loading && (
            <div className="text-center py-10">
              <p className="text-zinc-500">Loading your websites...</p>
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {websites.length == 0 && (
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
          )}

          {!loading && !error && websites.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {websites.map((website, index) => {
                const copied = copiedId === website._id;

                return (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
                    className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl cursor-pointer overflow-hidden hover:shadow-lg hover:shadow-purple-900/30 transition flex flex-col transform-gpu will-change-transform"
                  >
                    <div
                      onClick={() => navigate(`/editor/${website._id}`)}
                      className="relative h-40 cursor-pointer "
                    >
                      <iframe
                        srcDoc={website.latestCode}
                        className="absolute inset-0 w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                    </div>
                    <div className="p-5 flex flex-col gap-4 flex-1 ">
                      <h3 className="text-base line-clamp-2 font-semibold group-hover:text-purple-300 transition">
                        {website.title}{" "}
                      </h3>

                      <p className="text-xs line-clamp-2 text-zinc-400 ">
                        Last Updated :-{" "}
                        {new Date(website.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </p>
                      {!website.deployed ? (
                        <button
                          onClick={() => handleDeploy(website._id)}
                          className="mt-auto flex items-center gap-2 justify-center px-6 py-3 rounded-xl bg-linear-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-700/30 hover:scale-105 transition"
                        >
                          <Rocket size={16} />
                          Deploy
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCopyId(website)}
                          className="mt-auto flex items-center gap-2 justify-center px-6 py-3 rounded-xl bg-linear-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-700/30 hover:scale-105 transition"
                        >
                          {copied ? (
                            <>
                              <Check size={16} />
                              Link Copied
                            </>
                          ) : (
                            <>
                              {" "}
                              <Share size={16} />
                              Share
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
