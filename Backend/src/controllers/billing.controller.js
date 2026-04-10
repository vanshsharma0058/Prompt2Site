import { PLANS, razorpay } from "../config/razorPay.js";

export const billing = async (req, res) => {
  try {
    const { planType } = req.body;
    const userId = req.user._id;
    const plan = PLANS[planType];
    if (!plan) {
  return res.status(400).json({
    message: "Invalid plan type",
  });
}

if (plan.price === 0) {
  return res.status(400).json({
    message: "Free plan does not require payment",
  });
}
    const order = await razorpay.orders.create({
      amount: plan.price * 100, // ₹ → paisel
      currency: "INR",
      receipt: `order_${Date.now()}`,

      notes: {
        userId: userId.toString(),
        credits: plan.credits,
        plan: plan.plan,
        productName: `Prompt2Site ${planType.toUpperCase()} Plan`,
      },
      
    });

    return res.status(200).json({
      message: "Order created successfully",
      orderId: order.id,  
      amount: order.amount,
      key_id:razorpay.key_id,
      userId: userId,
      credits: plan.credits,
      plan: plan.plan,
    productName: `Prompt2Site ${planType.toUpperCase()} Plan`
    });

  } catch (error) {
    return res.status(500).json({ message: `billing error ${error}` });
  }
};
