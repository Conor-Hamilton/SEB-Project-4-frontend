import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#2E1A47] text-white shadow-md py-4 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <p className="text-sm inline-block ml-4">
            © 2024 11th Planet Jiu-Jitsu. All rights reserved.
          </p>
        </div>
        <div></div>
        <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 text-sm font-medium">
          <li>
            <span>Privacy Policy</span>
          </li>
          <li>
            <span>Terms of Service</span>
          </li>
          <li>
            <span>Contact Us</span>
          </li>
        </ul>
      </div>
    </footer>
  );
}
