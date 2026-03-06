import React, { useContext, useState } from "react";
import { assets } from "./../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const { GenerateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (input) {
      const image = await GenerateImage(input);
      if (image) {
        setIsImageLoaded(true);
        setImage(image);
      }
    }
    setLoading(false)
  };

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col min-h-[90vh] 
                     justify-center items-center 
                     px-6 text-center"
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <img src={image} alt="" className="max-w-sm w-full  shadow-xl" />
          <span
            className={`absolute bottom-0 left-0
              h-1.5 rounded-b-2xl
              bg-gradient-to-r from-blue-500 to-blue-700
              ${loading ? "w-full transition-all duration-[10s]" : "w-0"}`}
          />
        </div>

        <p
          className={`mt-4 text-gray-600 text-sm sm:text-base ${
            !loading ? "hidden" : ""
          }`}
        >
          Loading....
        </p>
      </div>

      {!isImageLoaded && (
        <div
          className="flex w-full max-w-2xl 
                      bg-white shadow-md 
                      border border-gray-200 
                      mt-12 rounded-full 
                      overflow-hidden"
        >
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 px-6 py-3 
                     text-gray-700 
                     outline-none 
                     bg-transparent"
          />

          <button
            className="bg-gradient-to-r from-blue-600 to-blue-800 
                     hover:opacity-90 
                     transition-all duration-300
                     text-white px-10 sm:px-16 py-3 
                     font-medium"
            type="submit"
          >
            Generate
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className="flex gap-8 mt-10 items-center">
          <p
            onClick={() => {
              setIsImageLoaded(false);
            }}
            className="cursor-pointer text-blue-600 font-semibold
               relative after:content-[''] after:absolute
               after:left-0 after:-bottom-1 after:w-0
               after:h-[2px] after:bg-blue-600
               after:transition-all after:duration-300
               hover:after:w-full"
          >
            Generate Another
          </p>

          <a
            href={image}
            download
            className="text-gray-700 font-semibold
               hover:text-black transition duration-300"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
