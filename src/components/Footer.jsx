import React from 'react'
import { NavLink } from 'react-router'

const Footer = () => {
  return (
    <div className="w-full">
      <footer className="footer p-6 bg-[rgb(0,0,0)] text-white flex flex-col md:flex-row gap-6 md:gap-10 justify-between items-start md:items-center opacity-90">
        <div className="left md:w-1/3 flex justify-start md:justify-center items-start md:items-center font-bold">
          <h1 className="text-2xl md:text-3xl">One211 Technologies</h1>
        </div>
        
        <span className="hidden md:block w-0.5 h-24 bg-gray-500"></span>
        
        <div className="middle flex flex-col gap-2 items-start md:w-1/3">
          <h2 className="text-xl font-bold">Contact</h2>
          <div className="text-sm">
            <p>California, USA</p>
            <p>one211@technologies.com</p>
            <p>+1 (451) 456-9658</p>
            <p>343-365 W San Carlos St, San Jose, CA 95110, USA</p>
          </div>
        </div>

        <span className="hidden md:block w-0.5 h-24 bg-gray-500"></span>

        <div className="right flex flex-col gap-2 items-start md:w-1/3">
          <h2 className="text-xl font-bold">About</h2>
          <div className="text-sm flex flex-col gap-1">
            <NavLink to="/">- Data Solutions & Optimization</NavLink>
            <NavLink to="/">- Secure & Scalable Databases</NavLink>
            <NavLink to="/">- Innovate with One211 Tech</NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
