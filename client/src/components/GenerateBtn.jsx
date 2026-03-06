import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const GenerateBtn = () => {

  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate()

   const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };
  
  return (
  
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center 
                    text-center my-32 px-6"
    >
      <h1
        className="text-3xl sm:text-4xl lg:text-5xl 
                       font-bold mb-8 
                       bg-gradient-to-r from-blue-600 to-blue-800 
                       bg-clip-text text-transparent"
      >
        See the magic. Try now
      </h1>

      <button onClick={onClickHandler}
        className="flex items-center gap-3 
                           bg-gradient-to-r from-blue-500 to-blue-700 
                           text-white font-medium 
                           px-10 py-3 rounded-full 
                           shadow-lg hover:shadow-blue-300/40 
                           hover:-translate-y-1 
                           transition-all duration-300 
                           sm:text-lg"
      >
        Generate Image
        <img className="h-6" src={assets.star_group} alt="" />
      </button>
    </motion.div>
  );
};

export default GenerateBtn;
