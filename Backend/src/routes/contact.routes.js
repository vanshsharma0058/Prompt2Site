import express from "express";
import { contactUs } from "../controllers/contact.controller.js";

const router = express.Router();
router.post("/contact",contactUs)

export default router;