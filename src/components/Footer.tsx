import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#2E1A47] text-white shadow-md py-4 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <img
            className="w-28 inline"
            src="./assets/11th-planet-logo.png"
            alt="11th Planet Logo"
          />
          <p className="text-sm inline-block ml-4">
            © 2024 11th Planet Jiu-Jitsu. All rights reserved.
          </p>
        </div>
        <div>
          <button onClick={scrollToTop} className="text-sm font-medium">
            Back to Top
          </button>
        </div>
        <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 text-sm font-medium">
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms">Terms of Service</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
