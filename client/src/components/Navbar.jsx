import { useContext, useState } from "react";
import { assets } from "./../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-between 
                 py-5 px-4 sm:px-8 
                 backdrop-blur-md 
                 sticky top-0 z-50 border-b border-gray-200"
    >
      <Link to="/">
        <img
          className="w-28 sm:w-32 lg:w-36 object-contain 
                     hover:scale-105 transition-transform duration-300"
          src={assets.logo}
          alt="logo"
        />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* Credit Button */}
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 
                         bg-blue-50 hover:bg-blue-100 
                         px-4 sm:px-6 py-2 rounded-full 
                         transition-all duration-300 
                         shadow-sm hover:shadow-md"
            >
              <img className="w-5" src={assets.credit_star} alt="" />
              <p className="text-sm font-medium text-gray-700">
                Credit left : {credit}
              </p>
            </button>

            {/* User Name */}
            <p className="text-gray-600 hidden sm:block font-medium">
              Hi, {user.name}
            </p>

            {/* Profile Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <img
                src={assets.profile_icon}
                className="w-10 h-10 rounded-full 
                           object-cover cursor-pointer 
                           shadow-md hover:shadow-lg 
                           transition-all duration-300"
                alt="profile"
              />

              {open && (
                <div
                  className="absolute top-12 right-0 
                             bg-white shadow-xl 
                             rounded-xl overflow-hidden 
                             border border-gray-100"
                >
                  <ul className="text-sm">
                    <li
                      onClick={logout}
                      className="px-5 py-3 hover:bg-gray-50 
                                 cursor-pointer transition"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="flex items-center gap-5 sm:gap-8">
            <p
              onClick={() => navigate("/buy")}
              className="cursor-pointer 
                         hover:text-blue-600 
                         transition font-medium 
                         text-sm sm:text-base"
            >
              Pricing
            </p>

            <button
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-800 
                         text-white px-6 sm:px-10 py-2.5 
                         rounded-full text-sm 
                         shadow-md hover:shadow-lg 
                         hover:-translate-y-0.5 
                         transition-all duration-300"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;