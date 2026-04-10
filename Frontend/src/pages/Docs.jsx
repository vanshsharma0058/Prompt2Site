import React, { useState } from "react";

const sections = [
  { id: "getting-started", title: "Getting Started" },
  { id: "how-it-works", title: "How It Works" },
  { id: "features", title: "Features" },
  { id: "pricing", title: "Pricing" },
];

const Docs = () => {
  const [active, setActive] = useState("getting-started");

  const scrollToSection = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex   text-white">
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-72 p-6 
      bg-white/5 backdrop-blur-2xl border-r border-white/10 
      sticky top-0 h-screen"
      >
        <h2 className="text-xl font-semibold mb-8">Documentation</h2>

        <nav className="flex flex-col gap-2">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`relative text-left px-4 py-2 rounded-lg transition-all
              ${
                active === sec.id
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {sec.title}

              {active === sec.id && (
                <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r" />
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 mt-6 px-6 md:px-16 py-16 space-y-16 max-w-5xl mx-auto">
        {/* Section Card */}
        <Section id="getting-started" title="Getting Started">
          Prompt2Site lets you generate full websites from a single prompt.
        </Section>

        <Section id="how-it-works" title="How It Works">
          Enter your idea → AI generates code → preview instantly → deploy.
        </Section>

        <Section id="features" title="Features">
          <ul className="space-y-2">
            <li>⚡ AI-generated websites</li>
            <li>🎯 Live preview</li>
            <li>🛠 Editable code</li>
          </ul>
        </Section>

        <Section id="pricing" title="Pricing">
          Choose a plan and scale your creativity with AI.
        </Section>
      </main>
    </div>
  );
};

const Section = ({ id, title, children }) => {
  return (
    <section
      id={id}
      className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-purple-900/10"
    >
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div className="text-zinc-400 leading-relaxed">{children}</div>
    </section>
  );
};

export default Docs;
