import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";
import axios from "axios";
import { serverUrl } from "../App";
import toast from "react-hot-toast";
const Contact = () => {
  // ✅ state inside component
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${serverUrl}/api/contact`, form, {
        withCredentials: true,
      });

      toast.success("Message sent successfully 🚀");

      // reset form
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 md:px-16 py-20 text-white relative overflow-x-hidden">
      {/* Glow Background */}
      <div
        className="
  absolute top-0 left-1/2 -translate-x-1/2 
  w-[400px] h-[400px] 
  sm:w-[500px] sm:h-[500px] 
  md:w-[600px] md:h-[600px] 
  bg-purple-600/20 blur-[120px] rounded-full -z-10
"
      />

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Get in{" "}
          <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Touch
          </span>
        </h1>

        <p className="text-zinc-400 text-lg">
          Have questions, feedback, or ideas? We'd love to hear from you.
        </p>
      </motion.div>

      {/* MAIN */}
      <div className="grid md:grid-cols-2 gap-12 mt-20 max-w-6xl mx-auto">
        {/* LEFT */}
        <div className="space-y-6">
          <InfoCard icon={<Mail />} title="Email">
            support@prompt2site.com
          </InfoCard>

          <InfoCard icon={<Phone />} title="Phone">
            +91 9245929394
          </InfoCard>

          <InfoCard icon={<MapPin />} title="Location">
            India
          </InfoCard>
        </div>

        {/* RIGHT FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-6"
        >
          <Input
            placeholder="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            placeholder="Your Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message..."
            rows="5"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none text-sm focus:ring-2 focus:ring-purple-500"
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            className="w-full py-3 rounded-xl bg-linear-to-r from-purple-600 to-blue-600 font-semibold shadow-lg shadow-purple-900/30 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;

const Input = ({ placeholder, type = "text", name, value, onChange }) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none text-sm focus:ring-2 focus:ring-purple-500"
    />
  );
};

const InfoCard = ({ icon, title, children }) => {
  return (
    <div className="flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10">
        {icon}
      </div>

      <div>
        <p className="text-sm text-zinc-400">{title}</p>
        <p className="text-sm font-medium">{children}</p>
      </div>
    </div>
  );
};
