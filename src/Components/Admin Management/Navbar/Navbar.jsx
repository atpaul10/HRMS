import { useState, useEffect } from "react";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";

const Navbar = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-indigo-950 text-white fixed top-0 left-60 right-0 z-10 h-16 shadow-md">
      <div className="flex justify-between items-center h-full px-4">
        {/* Search Input */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search"
            className="bg-white text-black px-3 py-1 rounded-md focus:outline-none"
          />
          <FaSearch className="text-white" />
        </div>

        {/* Date, Time, and Icons */}
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-4">
            <span>{date.toLocaleDateString()}</span>
            <span>{date.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaBell className="text-white cursor-pointer" />
            <FaUser className="text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
