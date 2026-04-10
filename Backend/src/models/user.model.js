import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
    },

    googleId: {
      type: String,
      default: null, // null for local users
    },
    avatar: {
      type: String,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    credits: {
      type: Number,
      default: 200,
      min: 0,
    },
    plan: {
      type: String,
      enum: ["free", "pro", "enterprise"], //this for the multiple value of choice
      default: "free",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
