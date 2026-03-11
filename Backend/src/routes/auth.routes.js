import express from "express"
import { googleAuth,logoutUser,registerUser, loginUser } from "../controllers/auth.controller.js"

const router=express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/google",googleAuth)
router.get("/logout",logoutUser)


export default router