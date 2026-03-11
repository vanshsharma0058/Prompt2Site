import React from 'react'
import Particles from './Particles';
const Background = () => {
  return (
    //   {/* 🔥 Background Glow */}
    //   {/* 🔥 Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-150 h-150 bg-purple-600/30 blur-[200px] rounded-full"></div>
        <div className="absolute -bottom-40 -right-40 w-150 h-150 bg-blue-500/30 blur-[200px] rounded-full"></div>
        {/* ✨ Center Light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.06),transparent_60%)]"></div>

        {/* This is for the particle in the bg */}
        <Particles />
      </div>
  )
}

export default Background
