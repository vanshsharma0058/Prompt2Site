import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//The work of this container is children show at delay of 0.2s
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 80, rotateX: 15, scale: 0.98, filter: "blur(3px)" },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
    },
  },
};

const Hero = () => {
  // Get user data from Redux store to conditionally render content if needed
  const { userData } = useSelector((state) => state.user);

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      style={{ perspective: 1200 }}
      className="flex flex-col items-center justify-center text-center min-h-screen px-6"
    >
      <motion.div
        variants={item}
        className="mb-6 px-4 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm text-gray-300"
      >
        ✨ AI Powered Website Builder
      </motion.div>

      <motion.h1
        variants={item}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug sm:leading-tight max-w-4xl"
      >
        Build Stunning Websites <br />
        <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          From a Single Prompt
        </span>
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-6 text-gray-300 max-w-md sm:max-w-xl md:max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed px-4 sm:px-0"
      >
        Describe your idea in one sentence. Prompt2Site transforms it into a
        stunning, responsive website — ready to launch instantly.
      </motion.p>
      
      {!userData ? <Link to="/login">
        <motion.button
          variants={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 px-6 py-3 rounded-xl bg-linear-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-700/30 cursor-pointer"
        >
          Get Started 🚀
        </motion.button>
      </Link>:<Link to="/dashboard">
        <motion.button
          variants={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 px-6 py-3 rounded-xl bg-linear-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-700/30 cursor-pointer"
        >
          Go to dashboard 🚀
        </motion.button></Link>
      }
    </motion.section>
  );
};

export default Hero;
