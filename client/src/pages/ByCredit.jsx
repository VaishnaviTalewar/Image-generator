import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ByCredit = () => {

  const { user, backend_url, loadCreditsData, token, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  console.log(import.meta.env.VITE_RAZORPAY_KEY_ID);

  // Razorpay payment open
  const initPay = async (order) => {

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Buy Credits",
      order_id: order.id,
      receipt: order.receipt,

      prefill: {
        name: user?.name,
        email: user?.email
      },

      handler: async (response) => {
        try {

          const { data } = await axios.post(
            backend_url + "/api/user/verify-razor",
            response,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (data.success) {
            loadCreditsData();
            navigate("/");
            toast.success("Credits Added Successfully");
          } else {
            toast.error(data.message);
          }

        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  // Create Razorpay Order
  const paymentrazorpay = async (planId) => {

    try {

      if (!user) {
        setShowLogin(true);
        return;
      }

      const { data } = await axios.post(
        backend_url + "/api/user/pay-razor",
        { planId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  };


  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-20 mb-16 px-6 bg-gradient-to-b from-gray-50 to-white"
    >

      <button
        className="border border-blue-500 text-blue-600 
        px-10 py-2 rounded-full mb-6 
        hover:bg-blue-50 hover:scale-105 
        transition-all duration-300 font-medium shadow-sm"
      >
        Our Plans
      </button>

      <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 tracking-tight mb-14">
        Choose the plan
      </h1>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">

        {plans.map((item, index) => (

          <div
            key={index}
            className="group bg-white/80 backdrop-blur-md 
            p-10 rounded-3xl shadow-lg border
            hover:shadow-2xl hover:-translate-y-3
            transition-all duration-500"
          >

            <img
              src={assets.logo_icon}
              alt=""
              className="w-14 mx-auto mb-6 group-hover:scale-110 transition duration-300"
            />

            <p className="text-xl font-semibold text-gray-800 mb-3">
              {item.id}
            </p>

            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              {item.desc}
            </p>

            <div className="mb-6">
              <span className="text-3xl font-bold text-blue-500">
                ${item.price}
              </span>

              <span className="text-gray-500 text-sm ml-2">
                / {item.credits} credits
              </span>
            </div>

            <button
              onClick={() => paymentrazorpay(item.id)}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-800 
              text-white py-2.5 rounded-full
              hover:opacity-90 hover:scale-105
              transition-all duration-300 shadow-md"
            >
              {user ? "Purchase" : "Get Started"}
            </button>

          </div>

        ))}

      </div>

    </motion.div>
  );
};

export default ByCredit;