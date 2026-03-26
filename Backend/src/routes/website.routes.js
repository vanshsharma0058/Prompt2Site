import express from "express"
import { generateWebsite, getWebsiteById,updateWebsiteConversation,getAllWebsites, deployWebsite, findWebsiteBySlug } from "../controllers/website.controller.js"
import {isAuth} from "../middlewares/isAuth.middleware.js"
const router=express.Router()
router.post('/generate',isAuth,generateWebsite)
router.post('/update/:id',isAuth,updateWebsiteConversation)
router.get('/get-by-id/:id',isAuth,getWebsiteById)
router.get('/get-all',isAuth,getAllWebsites)
router.get('/deploy/:id',isAuth,deployWebsite)
router.get('/find-by-slug/:slug',isAuth,findWebsiteBySlug)

export default router