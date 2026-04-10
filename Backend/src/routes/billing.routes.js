import express from "express";

import { billing } from "../controllers/billing.controller.js";
import { isAuth } from "../middlewares/isAuth.middleware.js";
import { verifyPayment } from "../controllers/verifyPayment.js";
import { getPaymentHistory } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session",isAuth,billing )
router.post("/verify-payment",isAuth,verifyPayment )
router.get("/history",isAuth,getPaymentHistory)
export default router

