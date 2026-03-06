import React from "react";
import { assets, testimonialsData } from "./../assets/assets";
import { motion } from 'motion/react';

const Testimonials = () => {
  return (
    <motion.div
     initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
      className="flex flex-col items-center justify-center 
                 text-center my-32 px-6"
    >
      <h1
        className="text-4xl sm:text-5xl lg:text-6xl 
                   font-extrabold mb-6 
                   bg-gradient-to-r from-blue-600 to-blue-800 
                   bg-clip-text text-transparent tracking-tight"
      >
        Customer Testimonials
      </h1>

      <p
        className="text-gray-600 text-lg sm:text-xl 
                   max-w-2xl leading-relaxed mb-16"
      >
        What Our Users Are Saying
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 
                       shadow-md hover:shadow-xl 
                       transition-all duration-300 
                       hover:-translate-y-2 text-left"
          >
            <div className="flex items-center gap-4 mb-5">
              <img
                className="w-14 h-14 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h2 className="font-semibold text-lg text-blue-500">
                  {testimonial.name}
                </h2>
                <h3 className="text-sm text-gray-500">
                  {testimonial.role}
                </h3>
              </div>
            </div>

            <div className="flex gap-1 mb-4">
              {Array(testimonial.stars)
                .fill()
                .map((item, index) => (
                  <img
                    key={index}
                    className="w-4 h-4"
                    src={assets.rating_star}
                    alt="star"
                  />
                ))}
            </div>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {testimonial.text}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;