import React from "react";
import { stepsData } from "../assets/assets";
import { motion } from "framer-motion";

const Steps = () => {
  return (
    <section className="relative py-24 px-6 ">
      {/* Heading */}
      <motion.div
        className="text-center mb-16 "
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        
      >
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          How It Works
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Transform your words into stunning AI-generated visuals in just a few
          simple steps.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto grid gap-8">
        {stepsData.map((item, index) => (
          <div
            key={index}
            className="group relative flex items-start gap-6 p-8 rounded-2xl 
                       bg-white/60 backdrop-blur-lg border border-gray-200
                       shadow-lg hover:shadow-2xl 
                       hover:-translate-y-2 transition-all duration-300"
          >
            {/* Step Number */}
            <div
              className="absolute -top-4 -left-4 w-10 h-10 flex items-center justify-center 
                            rounded-full bg-gradient-to-r from-blue-500 to-blue-800 
                            text-white font-semibold shadow-md"
            >
              {index + 1}
            </div>

            {/* Icon */}
            <div
              className="p-4 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 
                            group-hover:scale-110 transition-transform duration-300"
            >
              <img width={40} src={item.icon} alt="" />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h2>
              <p className="text-gray-600 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;
