import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion, useScroll, useTransform } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
  if (user) {
    navigate("/result");

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);

  } else {
    setShowLogin(true);
  }
};
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 
                      w-[700px] h-[700px] 
                      bg-blue-500/20 
                      blur-[160px] 
                      rounded-full 
                      animate-pulse"
      />

      <motion.div
        className="relative z-10 flex flex-col justify-center items-center text-center 
                   my-28 px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="text-stone-600 inline-flex items-center gap-2 
                     bg-white/80 backdrop-blur-md 
                     px-6 py-2 rounded-full 
                     border border-neutral-300 shadow-sm"
        >
          <p className="text-sm sm:text-base font-medium">
            Best text to image generator
          </p>
          <img className="w-4 sm:w-5" src={assets.star_icon} alt="" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="text-4xl sm:text-6xl lg:text-7xl 
                     font-extrabold 
                     max-w-[320px] sm:max-w-[700px] 
                     mx-auto mt-10 leading-tight tracking-tight"
        >
          Turn text to{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            image
          </span>
          , in seconds.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-gray-600 max-w-2xl mx-auto mt-6 
                     text-base sm:text-lg leading-relaxed"
        >
          Generate stunning images from your text instantly using our AI-powered
          text-to-image generator. Transform ideas into visuals in seconds.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={onClickHandler}
          variants={itemVariants}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0px 0px 0px rgba(59,130,246,0.4)",
              "0px 0px 30px rgba(59,130,246,0.6)",
              "0px 0px 0px rgba(59,130,246,0.4)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
            },
          }}
          className="sm:text-lg font-medium text-white 
                     bg-gradient-to-r from-blue-600 to-blue-800 
                     mt-10 px-12 py-3 flex items-center gap-3 
                     rounded-full shadow-lg"
        >
          Generate Images
          <img className="h-6" src={assets.star_group} alt="" />
        </motion.button>

        {/* Floating Images with Parallax */}
        <motion.div
          // style={{ y: parallaxY }}
          variants={itemVariants}
          className="flex flex-wrap justify-center mt-20 gap-4"
        >
          {Array(6)
            .fill("")
            .map((_, index) => (
              <motion.img
                key={index}
                variants={floatingAnimation}
                animate="animate"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg shadow-md cursor-pointer max-sm:w-10"
                src={
                  index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1
                }
                width={75}
                alt=""
              />
            ))}
        </motion.div>

        {/* Footer Text */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-neutral-500 text-sm"
        >
          Generated images from imagify
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Header;
