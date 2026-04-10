import React from "react";
import { motion } from "motion/react";
import { Sparkles, Rocket, Code2, Users, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen px-6 md:px-16 py-20 text-white relative">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-purple-600/20 blur-[120px] rounded-full -z-10" />

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Building the Future of{" "}
          <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            AI Website Creation
          </span>
        </h1>

        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Prompt2Site transforms ideas into production-ready websites instantly.
          No setup. No complexity. Just pure creation.
        </p>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto">
        <Stat title="10K+" subtitle="Websites Generated" />
        <Stat title="2K+" subtitle="Active Users" />
        <Stat title="99%" subtitle="Satisfaction Rate" />
        <Stat title="24/7" subtitle="AI Availability" />
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto">
        <Card icon={<Sparkles />} title="AI Powered">
          Generate full websites with a single prompt using advanced AI.
        </Card>

        <Card icon={<Code2 />} title="Clean Code">
          Production-ready, scalable code that developers love.
        </Card>

        <Card icon={<Rocket />} title="Instant Deploy">
          Go live in minutes with zero configuration.
        </Card>
      </div>

      {/* MISSION */}
      <div className="mt-28 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
        <p className="text-zinc-400 leading-relaxed text-lg">
          We believe building websites should be as simple as describing an idea.
          Prompt2Site removes technical barriers so anyone can create, launch,
          and scale instantly.
        </p>
      </div>

      {/* VISION */}
      <div className="mt-20 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Our Vision</h2>
        <p className="text-zinc-400 leading-relaxed text-lg">
          To redefine how software is built — where AI becomes the interface,
          and creativity becomes the only requirement.
        </p>
      </div>

      {/* FOUNDER SECTION */}
<div className="mt-28 max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">

  {/* Left - Image */}
  <div className="flex justify-center">
    <div className="relative w-60 h-60 rounded-2xl overflow-hidden border border-white/10">
      <img
        src="https://avatars.githubusercontent.com/u/208438515?v=4"
        alt="Founder"
        className="w-full h-full object-cover"
      />

      {/* glow */}
      <div className="absolute inset-0 bg-purple-600/10 blur-2xl" />
    </div>
  </div>

  {/* Right - Content */}
  <div>
    <h2 className="text-3xl font-semibold mb-4">Meet the Developer</h2>

    <p className="text-zinc-400 leading-relaxed mb-4">
      Hi, I’m Vansh — the creator of Prompt2Site. I built this platform to
      simplify how websites are created using AI.
    </p>

    <p className="text-zinc-400 leading-relaxed">
      My goal is to empower developers, creators, and founders to turn ideas
      into real products instantly without friction.
    </p>

    <div className="mt-6 text-sm text-purple-400">
      — Vansh Sharma
    </div>
  </div>

</div>



    </div>
  );
};

export default About;



const Card = ({ icon, title, children }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl 
      hover:shadow-lg hover:shadow-purple-900/30 transition"
    >
      <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-white/10 group-hover:bg-white/20 transition">
        {icon}
      </div>

      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      <p className="text-zinc-400 text-sm leading-relaxed">
        {children}
      </p>
    </motion.div>
  );
};

const Stat = ({ title, subtitle }) => {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-xl">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-zinc-400 text-sm mt-1">{subtitle}</p>
    </div>
  );
};