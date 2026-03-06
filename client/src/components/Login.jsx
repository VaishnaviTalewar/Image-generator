import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setShowLogin, backend_url, setToken, setUser } =
    useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        const { data } = await axios.post(backend_url + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backend_url + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="absolute fixed inset-0 z-50 
                    bg-black/40 backdrop-blur-md 
                    flex justify-center items-center px-6"
    >
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white w-full max-w-md 
                       rounded-3xl shadow-2xl 
                       p-10 text-center relative"
      >
        <h1 className="text-3xl font-semibold text-blue-800 mb-2">{state}</h1>

        <p className="text-gray-500 text-sm mb-8">
          Welcome Back! Please sign in to continue
        </p>

        {/* Full Name */}
        {state !== "Login" && (
          <div
            className="flex items-center border border-gray-300 
                        rounded-full px-5 py-3 mb-5
                        focus-within:border-blue-500
                        focus-within:shadow-md
                        transition-all duration-300"
          >
            <img
              src={assets.profile_icon}
              alt=""
              className="w-5 mr-3 opacity-80"
            />

            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              required
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>
        )}

        {/* Email */}
        <div
          className="flex items-center border border-gray-300 
                        rounded-full px-5 py-3 mb-5
                        focus-within:border-blue-500
                        focus-within:shadow-md
                        transition-all duration-300"
        >
          <img src={assets.email_icon} alt="" className="w-5 mr-3 opacity-70" />

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email Address"
            required
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        {/* Password */}
        <div
          className="flex items-center border border-gray-300 
                        rounded-full px-5 py-3
                        focus-within:border-blue-500
                        focus-within:shadow-md
                        transition-all duration-300"
        >
          <img src={assets.lock_icon} alt="" className="w-5 mr-3 opacity-70" />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right mt-2 mb-6">
          <span className="text-sm text-blue-600 cursor-pointer hover:underline">
            Forgot Password?
          </span>
        </div>

        {/* Button */}
        <button
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 
             text-white py-3 rounded-full font-medium
             hover:scale-105 hover:shadow-lg
             transition-all duration-300"
        >
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {/* Bottom Text */}
        {state === "Login" ? (
          <p className="text-sm text-gray-500 mt-6">
            Dont have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        )}
        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="close"
          className="absolute top-5 right-5 w-4 h-4 
             cursor-pointer opacity-70 
             hover:opacity-100 hover:scale-110 
             transition duration-200"
        />
      </motion.form>
    </div>
  );
};

export default Login;
