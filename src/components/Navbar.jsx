import React from 'react';
import logo from '../assets/logo.svg';

const Navbar = () => {
  return (
    <nav className="flex justify-center bg-indigo-900 text-white py-2">
      <div className="logo flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <span className="font-bold text-xl mx-4">iTask</span>
      </div>
    </nav>
  );
}

export default Navbar;
