import { ArrowLeft, Check, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const pricingPlans = [
  {
    key: "free",
    name: "Free",
    price: 0,
    credits: 200,
    descriptions: "Best for beginners who want to explore the platform.",
    features: [
      "100 AI generation credits",
      "Basic website templates",
      "Standard support",
      "Export HTML & CSS",
      "Easily Deploy"
    ],
    popular: false,
    button: "Get Started",
  },
  {
    key: "pro",
    name: "Pro",
    price: 499,
    credits: 500,
    descriptions: "Perfect for developers and freelancers building projects.",
    features: [
      "500 AI generation credits",
      "Premium website templates",
      "Faster AI generation",
      "Priority support",
      "API access",
    ],
    popular: true,
    button: "Upgrade to Pro",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: 999,
    credits: 1000,
    descriptions: "For teams and businesses that need unlimited power.",
    features: [
      "1000 AI generation",
      "All premium templates",
      "Team collaboration",
      "Custom integrations",
      "Dedicated support",
    ],
    popular: false,
    button: "Contact Sales",
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden px-4 sm:px-6 pt-10 pb-24  text-white">

      {/* Back Button */}
      <button
        className="mb-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-14 px-2"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Simple, transparent pricing
        </h1>

        <p className="text-zinc-400 text-sm sm:text-base md:text-lg">
          Buy credits once, build anytime
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{  y: -10, scale: 1.02  }}
            className={`relative rounded-2xl border p-6 sm:p-8 backdrop-blur-xl transition
            ${
              plan.popular
                ? "border-purple-500 bg-linear-to-b from-purple-700/10 to-transparent lg:scale-105 "
                : "border-white/10 bg-linear-to-b from-purple-400/10 to-transparent"
            }`}
          >

            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-3 left-6 bg-purple-600 text-xs px-3 py-1 rounded-full font-medium">
                Most Popular
              </div>
            )}

            {/* Plan Name */}
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              {plan.name}
            </h3>

            {/* Description */}
            <p className="text-zinc-400 text-sm mb-6">
              {plan.descriptions}
            </p>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl sm:text-4xl font-bold">
                ₹{plan.price}
              </span>
              <span className="text-zinc-400 ml-2 text-sm">
                / one-time
              </span>
            </div>

            {/* Credits */}
            <p className="flex gap-2 items-center text-sm text-purple-400 mb-6">
              <Coins size={18} className="text-yellow-400"/>
              {plan.credits} Credits Included
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-zinc-300"
                >
                  <Check size={16} className="text-purple-400" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              className={`w-full py-3 rounded-lg text-sm font-medium transition
              ${
                plan.popular
                  ? "bg-linear-to-r from-purple-500 to-indigo-500 hover:opacity-90"
                  : "bg-linear-to-r from-purple-500 to-indigo-600 hover:opacity-90"
              } disabled:opacity-65`}
            >
              {plan.button}
            </button>

          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;