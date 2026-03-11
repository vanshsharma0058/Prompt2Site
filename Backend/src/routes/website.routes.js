import express from "express"
import { generateWebsite } from "../controllers/website.controller.js"
import {isAuth} from "../middlewares/isAuth.middleware.js"
const router=express.Router()
router.post('/generate',isAuth,generateWebsite)

export default router