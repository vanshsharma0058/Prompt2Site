import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import websiteRouter from "./routes/website.routes.js"
import contactRouter from "./routes/contact.routes.js"
import billingRouter from "./routes/billing.routes.js"

const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://prompt2site-1-cvux.onrender.com",
    credentials:true
}))
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/website",websiteRouter)
app.use("/api",contactRouter)
app.use("/api/billing",billingRouter)
export default app
