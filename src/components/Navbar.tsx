import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/Logo.png";


interface NavbarProps {
  user: null | IUser;
  setUser: Function;
}

export default function Navbar({ user, setUser }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownHoverTimer, setDropdownHoverTimer] =
    useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openDropdown = () => {
    if (dropdownHoverTimer) {
      clearTimeout(dropdownHoverTimer);
    }
    setIsDropdownOpen(true);
  };

  const closeDropdownDelayed = () => {
    const timer = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 500);
    setDropdownHoverTimer(timer);
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
          <Link to="/">
            <img
              className="w-28"
              src={Logo}
              alt="11th Planet Logo"
            />
          </Link>

          <button onClick={toggleMenu} className="md:hidden text-xl">
            ☰
          </button>

          <ul
            className={`hidden md:flex items-center space-x-4 text-lg font-medium`}
          >
            <div className="flex items-center space-x-4 text-lg font-medium mr-24">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/aboutus" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/timetable" className="hover:underline">
                  Book Class
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:underline">
                  Shop
                </Link>
              </li>
            </div>

            {user ? (
              <div
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdownDelayed}
              >
                <div className="flex items-center cursor-pointer">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-xl mr-2"
                  />
                  <span>{user.username}</span>
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                </div>

                {isDropdownOpen && (
                  <ul className="absolute right-0 w-48 bg-white text-black mt-2 rounded-md shadow-lg py-2">
                    <li>
                      <Link
                        to={`/profile/${user.username}`}
                        className="block px-4 py-2 hover:bg-gray-200"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <>
                <li>
                  <Link to="/signup" className="hover:underline">
                    Sign-up
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 right-0 bg-[#2E1A47] h-full w-1/3 md:w-1/2 lg:w-1/3 z-50 transform ease-in-out duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button onClick={toggleMenu} className="text-xl p-4">
              &times;
            </button>
            <ul className="flex flex-col items-center space-y-6 font-medium ">
              <li>
                <Link to="/" onClick={toggleMenu} className="text-white px-5 py-2 rounded-full hover:bg-[#3c2355]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/aboutus" onClick={toggleMenu} className="text-white px-5 py-2 rounded-full hover:bg-[#3c2355]">
                  About
                </Link>
              </li>
              <li>
                <Link to="/timetable" onClick={toggleMenu} className="text-white px-5 py-2 rounded-full hover:bg-[#3c2355]">
                  Timetable
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={toggleMenu} className="text-white px-5 py-2 rounded-full hover:bg-[#3c2355]">
                  Shop
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link
                      to={`/profile/${user._id}`}
                      onClick={toggleMenu}
                      className="text-white px-5 py-2 rounded-full hover:bg-[#3c2355]"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={mobileLogout}
                      className="text-white px-5 py-2 rounded-full hover:bg-[#3c2355]"
                    >
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/signup" onClick={toggleMenu} className="text-white px-5 py-2 rounded-full hover:bg-[#3c2355]">
                      Sign-up
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={toggleMenu} className="text-white px-5 py-2 rounded-full hover:bg-[#3c2355]">
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
