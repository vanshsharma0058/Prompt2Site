import dotenv from "dotenv";
dotenv.config();

const { default: app } = await import("./src/app.js");
const { default: connectDB } = await import("./src/db/db.js");

await connectDB();
const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server is running on PORT 3000");
});
