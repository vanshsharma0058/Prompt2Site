import Payment from "../models/billing.model.js";

export const getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const payments = await Payment.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      payments,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};