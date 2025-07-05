import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const toggleSideMenu = () => {
    setOpenSideMenu(!openSideMenu);
  };

  return (
    <div className="w-full relative">
      
      <div className="flex items-center justify-between bg-blue-600 px-6 py-4 shadow-lg text-white">
        <button
          className="text-2xl focus:outline-none hover:text-blue-300"
          onClick={toggleSideMenu}
          aria-label="Toggle menu"
        >
          {openSideMenu ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>

        <h2 className="text-xl font-semibold tracking-wide">Finlogix</h2>

        <div></div> 
      </div>

    
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          openSideMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SideMenu activeMenu={activeMenu} />
      </div>

  
      {openSideMenu && (
        <div 
         className="fixed inset-0 bg-white z-40"
          onClick={toggleSideMenu}
        />
      )}
    </div>
  );
};

export default Navbar;