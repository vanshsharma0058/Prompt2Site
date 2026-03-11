import dotenv from "dotenv"
import app from "./src/app.js"
import connectDB from "./src/db/db.js";

dotenv.config()
connectDB()

const PORT =  3000;

app.listen(PORT,()=>{
    console.log("Server is running on PORT 3000")
})
