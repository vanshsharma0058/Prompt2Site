import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PaymentHistory = () => {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);

  const [planFilter, setPlanFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/billing/history`,
          { withCredentials: true }
        );
        setPayments(res.data.payments);
        setFilteredPayments(res.data.payments);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    fetchPayments();
  }, []);

  // 🔥 FILTER LOGIC
  useEffect(() => {
    let temp = [...payments];

    // Filter by plan
    if (planFilter !== "all") {
      temp = temp.filter((p) => p.plan === planFilter);
    }

    // Filter by date
    if (dateFilter !== "all") {
      const now = new Date();

      temp = temp.filter((p) => {
        const paymentDate = new Date(p.createdAt);
        const diffDays =
          (now - paymentDate) / (1000 * 60 * 60 * 24);

        if (dateFilter === "7") return diffDays <= 7;
        if (dateFilter === "30") return diffDays <= 30;

        return true;
      });
    }

    setFilteredPayments(temp);
  }, [planFilter, dateFilter, payments]);

  return (
    <div className="min-h-screen px-4 sm:px-8 py-10 text-white ">

      {/* Back Button */}
      <button
        className="mb-6 flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6">💳 Payment History</h1>

      {/* 🔥 FILTERS */}
      <div className="flex flex-wrap gap-4 mb-6">

        {/* Plan Filter */}
        <select
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value)}
          className="px-4 py-2 bg-gray-600 border border-white/10 rounded-lg"
        >
          <option value="all">All Plans</option>
          <option value="free">Free</option>
          <option value="pro">Pro</option>
          <option value="enterprise">Enterprise</option>
        </select>

        {/* Date Filter */}
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 bg-gray-600 border border-white/10 rounded-lg"
        >
          <option value="all">All Time</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
        </select>

      </div>

      {/* Empty State */}
      {filteredPayments.length === 0 ? (
        <div className="text-center text-zinc-400 mt-20">
          No matching payments 😔
        </div>
      ) : (

        <div className="overflow-x-auto rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5">

          {/* Header */}
          <div className="grid grid-cols-5 gap-4 px-6 py-4 text-sm text-zinc-400 border-b border-white/10">
            <span>Plan</span>
            <span>Credits</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Date</span>
          </div>

          {/* Rows */}
          {filteredPayments.map((p) => (
            <div
              key={p._id}
              className="grid grid-cols-5 gap-4 px-6 py-4 items-center border-b border-white/5 hover:bg-white/5 transition"
            >
              <span className="capitalize font-semibold">{p.plan}</span>

              <span className="text-purple-400">{p.credits}</span>

              <span>₹{p.amount/100}</span>

              <span>
                <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                  {p.status}
                </span>
              </span>

              <span className="text-sm text-zinc-400">
                {new Date(p.createdAt).toLocaleDateString()} <br />
                {new Date(p.createdAt).toLocaleTimeString()}
              </span>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default PaymentHistory;