import React from "react";
import { motion } from "motion/react";

const Privacy = () => {
  return (
    <div className="min-h-screen px-6 md:px-16 py-20 text-white">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Privacy Policy
        </h1>
        <p className="text-zinc-400">
          Your privacy matters. This policy explains how we handle your data.
        </p>
      </motion.div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto space-y-10 text-zinc-300 leading-relaxed">

        <Section title="1. Information We Collect">
          We may collect personal information such as your name, email address,
          and usage data when you interact with Prompt2Site.
        </Section>

        <Section title="2. How We Use Your Information">
          We use your data to provide, improve, and personalize our services,
          including generating websites and enhancing user experience.
        </Section>

        <Section title="3. Cookies">
          We may use cookies and similar technologies to improve functionality
          and analyze usage patterns.
        </Section>

        <Section title="4. Data Security">
          We implement reasonable security measures to protect your data, but no
          system is completely secure.
        </Section>

        <Section title="5. Third-Party Services">
          We may use third-party services such as payment gateways or analytics
          providers, which may collect data according to their own policies.
        </Section>

        <Section title="6. User Rights">
          You have the right to access, update, or delete your personal data.
          Contact us if you wish to exercise these rights.
        </Section>

        <Section title="7. Changes to This Policy">
          We may update this Privacy Policy from time to time. Continued use of
          the platform indicates acceptance of the updated policy.
        </Section>

        <Section title="8. Contact Us">
          If you have any questions about this policy, contact us at:
          support@prompt2site.com
        </Section>

      </div>
    </div>
  );
};

export default Privacy;

const Section = ({ title, children }) => {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl">
      <h2 className="text-xl font-semibold mb-3 text-white">{title}</h2>
      <p className="text-sm text-zinc-400">{children}</p>
    </div>
  );
};