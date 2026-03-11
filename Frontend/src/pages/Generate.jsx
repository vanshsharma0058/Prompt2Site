import axios from "axios";
import { ArrowLeft, Home, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";


const Generate = () => {
  const navigate = useNavigate();
const [prompt, setprompt] = useState("")

const handleGenerateWebsite=async ()=>{
  try {
    const result = await axios.post(`${serverUrl}/api/website/generate`,{prompt},{withCredentials:true})
    console.log(result)
   setprompt("")
  } catch (error) {
    console.log(error)
  }
}

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
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-lg border border-white/10 hover:bg-white/10 transition"
          >
            <Home size={20} />
          </button>
          <h1 className="text-lg font-semibold">Prompt2Site</h1>

          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg border border-white/10 hover:bg-white/10 transition"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
      </motion.div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Turn Your Idea Into a
            <span className="block bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Fully Functional Website
            </span>
          </h1>

          <p className="text-zinc-400 max-w-xl mx-auto mt-5 text-sm sm:text-base">
            Describe your idea and Prompt2Site will generate a complete modern
            website layout, components, and styling powered by AI.
          </p>
        </motion.div>

        {/* PROMPT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
        >
          <label className="text-sm text-zinc-400 mb-3 block">
            Describe your website idea
          </label>

          <textarea
            placeholder="Example: Create a modern SaaS landing page for a startup that helps freelancers manage invoices..."
            className="w-full h-44 sm:h-52 p-5 rounded-xl bg-black/30 border border-white/10 text-sm sm:text-base leading-relaxed outline-none focus:ring-2 focus:ring-purple-500/40 resize-none"
            onChange={(e)=>{setprompt(e.target.value)}}
            value={prompt}
          />
        </motion.div>

        {/* EXAMPLE PROMPTS */}
        <div className="mt-10">
          <p className="text-sm text-zinc-400 mb-4">
            Try one of these examples
          </p>

          <div className="flex flex-wrap gap-3">
            <button
            onClick={() => setprompt("Create a SaaS startup landing page with hero section, pricing table, and testimonials")}

            className="px-4 py-2 text-sm rounded-lg border border-white/10 hover:bg-white/10 transition" >
              SaaS startup landing page
            </button>

            <button
             onClick={() => setprompt("Create a modern portfolio website for a designer with project gallery and contact form")}
            className="px-4 py-2 text-sm rounded-lg border border-white/10 hover:bg-white/10 transition">
              Portfolio website for designer
            </button>

            <button
            onClick={() => setprompt("Create a restaurant website with menu section, reservation form, and location map")}
            className="px-4 py-2 text-sm rounded-lg border border-white/10 hover:bg-white/10 transition">
              Restaurant website with menu
            </button>
          </div>
        </div>

        {/* GENERATE BUTTON */}
        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3 rounded-xl 
            bg-linear-to-r from-purple-600 to-blue-600 
            shadow-lg shadow-purple-900/40 
            text-sm sm:text-base font-medium"
            onClick={handleGenerateWebsite}
          >
            <Sparkles size={18} />
            Generate Website
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Generate;
