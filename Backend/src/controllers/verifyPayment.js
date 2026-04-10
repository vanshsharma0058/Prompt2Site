import crypto from "crypto";
import { razorpay } from "../config/razorPay.js";
import User from "../models/user.model.js";
import Payment from "../models/billing.model.js"; // optional

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const userId = req.user._id;

    // 🔐 STEP 1: Create expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", razorpay.key_secret )
      .update(body.toString())
      .digest("hex");

    // ❌ STEP 2: Validate signature
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature ❌",
      });
    }

    // 🔍 STEP 3: Fetch order from Razorpay
    const order = await razorpay.orders.fetch(razorpay_order_id);

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Order not found",
      });
    }

    // 🎯 STEP 4: Extract data from notes (BEST PRACTICE)
    const credits = Number(order.notes.credits);
    const plan = order.notes.plan;

    if (!credits || !plan) {
      return res.status(400).json({
        success: false,
        message: "Invalid order notes",
      });
    }

    // 🧠 STEP 5: Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $inc: { credits: credits },
        plan: plan,
      },
      { new: true }
    );


    // 💾 STEP 6 (OPTIONAL BUT IMPORTANT): Save payment record
    
    const PaymentRecord = await Payment.create({
      userId: userId,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: order.amount,
      plan: plan,
      credits: credits,
      status: "success",
    });

    // ✅ FINAL RESPONSE
    return res.status(200).json({
      success: true,
      message: "Payment verified & credits added 🎉",
      user: updatedUser,
     
    });

  } catch (error) {
    console.error("Verification Error:", error);

    return res.status(500).json({
      success: false,
      message: `Verification error: ${error.message}`,
    });
  }
};