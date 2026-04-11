// This utility script fixes existing user records with incorrect plan casing
// Run this once to clean up the database

import User from "../models/user.model.js";

// export const fixPlanCasing = async () => {
//   try {
//     // Find users with capital E in Enterprise
//     const result = await User.updateMany(
//       { plan: "Enterprise" },
//       { plan: "enterprise" },
//     );

//     console.log(`Fixed ${result.modifiedCount} user records with plan casing`);
//     return result;
//   } catch (error) {
//     console.error("Error fixing plan casing:", error);
//     throw error;
//   }
// };

// You can run this from server.js on startup if needed, or manually
// Usage: import { fixPlanCasing } from "./src/utils/fixPlanCasing.js";
//        await fixPlanCasing();
