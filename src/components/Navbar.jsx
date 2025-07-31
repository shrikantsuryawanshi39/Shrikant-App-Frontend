import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import menuIcon from "../assets/images/menu.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const email = Cookies.get("email");
  const orgId = Cookies.get("orgId");
  // const navigate = useNavigate();
  let decodedToken;
  
  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      decodedToken = jwtDecode(jwt); 
      setLoggedIn(true);
      if(decodedToken.role == "ADMIN"){
        setIsAdmin(true);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwt");
    Cookies.remove("orgId");
    Cookies.remove("email");
    window.location.href = "/Login";
  };

  return (
    <nav className="bg-[rgba(0,0,0,0.19)] text-black px-6 py-4 shadow-sm relative">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">One211</h1>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl focus:outline-none cursor-pointer">
          <img
            src={menuIcon}
            alt="☰"
          />
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center justify-between gap-8">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/About">About</NavLink>
            </li>
            <li>
              <NavLink to="/Contact">Contact</NavLink>
            </li>
          </ul>

          <div className="buttons flex items-center justify-between gap-5">
            {!loggedIn ? (
              <div className="flex items-center gap-3">
                <NavLink to="/Login">
                  <button className="bg-black text-white border-1 border-black p-2 w-20 text-center rounded-sm hover:bg-white hover:text-black transition ease-in duration-300 cursor-pointer">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/Signup">
                  <button className="bg-black text-white border-1 border-black p-2 w-20 text-center rounded-sm hover:bg-white hover:text-black transition ease-in duration-300 cursor-pointer">
                    Signup
                  </button>
                </NavLink>
              </div>
            ) : (
              <div className="relative">
                <button
                  className="bg-black text-white border-1 border-black p-2 w-20 text-center rounded-sm hover:bg-white hover:text-black transition ease-in duration-300 cursor-pointer"
                  onClick={() => setProfileOpen(!profileOpen)}>
                  Profile
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-65 bg-white border shadow-xl rounded-md p-3 z-20">
                    <div className="m-1 mb-3">
                      <h2 className="text-md">Email: {email}</h2>
                      <h2 className="text-md">Role: {isAdmin ? ("admin"):("user")}</h2>
                      <h2 className="text-md">Org id: {orgId}</h2>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-600 text-white py-1 rounded hover:bg-red-700 border-1 border-black cursor-pointer transition">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {isAdmin && (
              <NavLink to="/Administration">
                <button className="bg-black text-white border-1 border-black p-2 w-20 text-center rounded-sm hover:bg-white hover:text-black transition ease-in duration-300 cursor-pointer">
                  Admin
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 absolute top-9 right-6 w-3xs rounded-md bg-white shadow-2xl p-6 z-10">
          <ul className="flex flex-col gap-3">
            <li>
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/About"
                onClick={() => setMenuOpen(false)}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Contact"
                onClick={() => setMenuOpen(false)}>
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="flex flex-col gap-3">
            {!loggedIn ? (
              <>
                <NavLink to="/Login">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="bg-black text-white border-1 border-black p-1 w-30 text-center rounded-sm hover:bg-white hover:text-black transition ease-in duration-300 cursor-pointer">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/Signup">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="bg-black text-white border-1 border-black p-1 w-30 text-center rounded-sm hover:bg-white hover:text-black transition ease-in duration-300 cursor-pointer">
                    Signup
                  </button>
                </NavLink>
              </>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-800 transition text-white p-1 w-30 rounded-sm border-1 border-black cursor-pointer text-center">
                  Logout
                </button>
              </div>
            )}
            <NavLink
              to="/Administration"
              className="w-fit">
              <button
                onClick={() => setMenuOpen(false)}
                className="bg-black text-white border-1 border-black p-1 w-30 text-center rounded-sm hover:bg-white hover:text-black transition ease-in duration-300 cursor-pointer">
                Admin
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
