import Razorpay from "razorpay";
export const PLANS = {
  free: { price: 0, credits: 200, plan: "Free" },
  pro: { price: 499, credits: 500, plan: "Pro" },
  enterprise: { price: 999, credits: 1000, plan: "Enterprise" },
};
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});
