import mongoose from "mongoose";


const billingSchema = new mongoose.Schema(
  {
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   
    required: true, 
  },
  orderId: {
    type: String,
    required: true,}
    ,
    paymentId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    plan: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        required: true,

    },
    status: {
        type: String,
        enum: ["success", "failed"],
        required: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", billingSchema);   
export default Payment;




    