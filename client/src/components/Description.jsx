import React from "react";
import { assets } from "../assets/assets";
import {motion} from "framer-motion"

const Description = () => {
  return (
    <motion.div
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
      className="flex flex-col items-center justify-center text-center 
                    my-36 px-6 md:px-20 lg:px-32"
    >
      <h1
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 
                   bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 
                   bg-clip-text text-transparent tracking-tight"
      >
        Create AI Images
      </h1>

      <p
        className="text-gray-500 text-lg sm:text-xl 
                   max-w-3xl leading-relaxed mb-20"
      >
        Turn your imagination into visuals
      </p>

      <div
        className="flex flex-col md:flex-row items-center gap-16 
                      max-w-7xl w-full"
      >
        <img
          className="w-80 sm:w-96 xl:w-[420px] 
                     rounded-3xl shadow-2xl 
                     hover:shadow-blue-200/50 
                     hover:-translate-y-2 
                     transition-all duration-500 ease-out"
          src={assets.sample_img_1}
          alt="AI generated sample"
        />

        <div className="flex flex-col gap-8 text-left max-w-2xl">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl 
                         font-bold text-blue-500 leading-snug"
          >
            Introducing the AI-Powered Text to Image Generator
          </h2>

          <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
            Experience the next generation of creativity with our AI-powered
            text to image generator. Simply type a description, and our advanced
            AI will transform your words into high-quality, visually stunning
            images within seconds — perfect for designs, social media,
            presentations, and more.
          </p>

          <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
            Whether you're a designer, content creator, marketer, or just
            exploring your creativity, our intelligent AI tool helps you
            generate unique and professional-quality images effortlessly. No
            design skills required — just describe your idea and watch it come
            to life instantly.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
