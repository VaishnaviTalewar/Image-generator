import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ByCredit from "./pages/ByCredit.jsx";
import Result from "./pages/Result.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import { useContext } from "react";
import { AppContext } from "./context/AppContext.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

const {showLogin} = useContext(AppContext)

  return (
    <div
      className="px-4 sm:px-10 md:px-14 lg:px-28 
                    min-h-screen 
                    bg-gradient-to-b 
                    from-teal-50 via-white to-orange-80"
    >
      <ToastContainer position="bottom-right"/>
      <Navbar />
     {showLogin && <Login />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<ByCredit />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
