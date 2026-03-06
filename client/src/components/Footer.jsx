import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div
      className="flex flex-col md:flex-row items-center 
                 justify-between gap-8 
                 py-12 mt-36 px-4
                 border-t border-gray-200 
                 bg-white/60 backdrop-blur-sm"
    >
      <img
        className="w-32 opacity-90 hover:opacity-100 transition-opacity duration-300"
        src={assets.logo}
        alt="logo"
      />

      <p className="text-gray-500 text-sm text-center md:text-left">
        © {new Date().getFullYear()} imagify. All rights reserved.
      </p>

      <div className="flex items-center gap-5">
        <img
          className="w-10 opacity-70 hover:opacity-100 
                     hover:scale-110 transition-all duration-300 cursor-pointer"
          src={assets.facebook_icon}
          alt="facebook"
        />
        <img
          className="w-10 opacity-70 hover:opacity-100 
                     hover:scale-110 transition-all duration-300 cursor-pointer"
          src={assets.twitter_icon}
          alt="twitter"
        />
        <img
          className="w-10 opacity-70 hover:opacity-100 
                     hover:scale-110 transition-all duration-300 cursor-pointer"
          src={assets.instagram_icon}
          alt="instagram"
        />
      </div>
    </div>
  );
};

export default Footer;