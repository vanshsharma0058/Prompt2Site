import { PLANS, razorpay } from "../config/razorPay";

export const billing = async (req, res) => {
  try {
    const { planType } = req.body;
    const userId = req.user._id;
    const plan = PLANS[planType];
    if (!plan || plan.price === 0) {
      return res.status(400).json({
        message:
          "plan type is required and should be either free, pro or enterprise",
      });
    }
    const order = await razorpay.orders.create({
      amount: plan.price * 100, // ₹ → paise
      currency: "INR",

      receipt: `order_${Date.now()}`,

      notes: {
        userId: userId.toString(),
        credits: plan.credits,
    plan: plan.plan,
        productName: `Prompt2Site ${planType.toUpperCase()} Plan`,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: `billing error ${error}` });
  }
};
