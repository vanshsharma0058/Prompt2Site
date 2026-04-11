import Razorpay from "razorpay";
export const PLANS = {
  free: { price: 0, credits: 200, plan: "free" },
  pro: { price: 499, credits: 500, plan: "pro" },
  enterprise: { price: 999, credits: 1000, plan: "enterprise" },
};
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
