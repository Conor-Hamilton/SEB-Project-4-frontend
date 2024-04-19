import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user";

interface NavbarProps {
  user: null | IUser;
  setUser: Function;
}

export default function Navbar({ user, setUser }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    console.log("user logged out");
  }

  function mobileLogout() {
    logout();
    toggleMenu();
  }

  return (
    <>
      <header className="bg-[#2E1A47] text-white shadow-md py-2">
        <nav className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <Link to="/">
            <img
              className="w-28"
              src="./assets/11th-planet-logo.png"
              alt="11th Planet Logo"
              />
              </Link>
          </div>

          <div>
            <button onClick={toggleMenu} className="md:hidden text-xl">
              ☰
            </button>
          </div>

          <ul
            className={`hidden md:flex items-center space-x-4 text-lg font-medium`}
          >
            <div className="flex items-center space-x-4 text-lg font-medium mr-24">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/aboutus">About</Link>
              </li>
              <li>
                <Link to="/kidsbjj">Kids</Link>
              </li>
              <li>
                <Link to="/timetable">Timetable</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
            </div>
            {user ? (
              <li>
                <button
                  onClick={logout}
                  className="text-white px-5 py-2 rounded-full hover:bg-[#3c2355]"
                >
                  Log Out
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/signup">Sign-up</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>

          <div
            className={`fixed top-0 right-0 bg-[#2E1A47] h-full w-3/4 md:w-1/2 lg:w-1/3 z-50 transform ease-in-out duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button onClick={toggleMenu} className="text-xl p-4">
              &times;
            </button>
            <ul className="flex flex-col items-center space-y-6 font-medium">
              <li>
                <Link to="/" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/aboutus" onClick={toggleMenu}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/kidsbjj" onClick={toggleMenu}>
                  Kids
                </Link>
              </li>
              <li>
                <Link to="/timetable" onClick={toggleMenu}>
                  Timetable
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={toggleMenu}>
                  Shop
                </Link>
              </li>
              {user ? (
                <li>
                  <button
                    onClick={mobileLogout}
                    className="text-white px-5 py-2 rounded-full hover:bg-[#3c2355]"
                  >
                    Log Out
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/signup" onClick={toggleMenu}>
                      Sign-up
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={toggleMenu}>
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
