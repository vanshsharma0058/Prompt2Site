import dotenv from "dotenv";
dotenv.config();

const { default: app } = await import("./src/app.js");
const { default: connectDB } = await import("./src/db/db.js");
const { fixPlanCasing } = await import("./src/utils/fixPlanCasing.js");

await connectDB();

// Fix any existing user records with incorrect plan casing
await fixPlanCasing();

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is running on PORT 3000");
});
