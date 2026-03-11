import React from 'react'
import {motion} from "motion/react"
import {
  Sparkles,
  Smartphone,
  Code2,
  Palette,
  Rocket,
  Terminal
} from "lucide-react";

const Features = () => {
  
  const icons = [
  Sparkles,
  Smartphone,
  Code2,
  Palette,
  Rocket,
  Terminal
];
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};
const item = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18
    }
  }
};
    const features = [
  {
    title: "From Prompt to Production",
    description:
      "Turn a simple text prompt into a fully functional, production-ready website in seconds. No setup, no boilerplate — just instant results."
  },
  {
    title: "Fully Responsive by Default",
    description:
      "Every website is automatically optimized for mobile, tablet, and desktop. Perfect layouts across all screen sizes without extra effort."
  },
  {
    title: "Clean & Maintainable Code",
    description:
      "Generate structured, readable, and scalable code that follows modern development best practices — built for long-term growth."
  },
  {
    title: "Modern AI-Powered Design",
    description:
      "Create visually stunning interfaces with gradients, glass effects, animations, and contemporary UI patterns — powered by intelligent AI design logic."
  },
  {
    title: "Instant Deployment Ready",
    description:
      "Export optimized code that’s ready to deploy on platforms like Vercel, Netlify, or your own server — no extra configuration required."
  },
  {
    title: "Developer-Friendly Output",
    description:
      "Built for developers and creators. Easily customize layouts, edit components, and extend functionality without fighting messy code."
  }
];
  return (
    <motion.section 
    id='features'
  variants={container}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.2}}
  className="relative max-w-7xl mx-auto px-6 py-32"
>

  {/* Section Heading */}
  <div 
   
  className="text-center mb-20">
    <motion.h2 variants={item} className="text-3xl md:text-5xl font-bold">
      Why Choose{" "}
      <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Prompt2Site
      </span>
      ?
    </motion.h2>

    <motion.p variants={item} className="mt-6 text-gray-400 max-w-2xl mx-auto">
      Everything you need to transform ideas into production-ready websites — instantly.
    </motion.p>
  </div>

  {/* Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

    {features.map((h, i) => {
      const Icon = icons[i];

      return (
        <motion.div
          key={i}
          variants={item}
          whileHover={{ rotateX: 6, rotateY: -6, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="group relative p-8 rounded-2xl 
          bg-white/5 backdrop-blur-xl 
          border border-white/10 
          shadow-xl shadow-purple-900/10
          transform-gpu perspective-1000"
          style={{ transformStyle: "preserve-3d" }}
        >

          {/* Animated Gradient Border */}
          <div className="absolute inset-0 rounded-2xl p-px bg-linear-to-r from-purple-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition duration-500"></div>

          <div className="relative z-10">

            {/* Icon */}
            <div className="mb-6 w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10">
              <Icon className="w-6 h-6 text-purple-400" />
            </div>

            <h3 className="text-xl font-semibold mb-4">
              {h.title}
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              {h.description}
            </p>

          </div>
        </motion.div>
      );
    })}

  </div>
</motion.section>
  )
}

export default Features
