import express from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.middleware.js";
const router = express.Router();

router.get("/me", isAuth, getCurrentUser);

export default router;
