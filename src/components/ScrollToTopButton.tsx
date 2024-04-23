import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => toggleVisibility();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`fixed bottom-5 right-5 rounded-full p-3 text-white bg-[#2E1A47] shadow-md transition duration-150 ease-in-out  ${
        isVisible ? "inline" : "hidden"
      }`}
      onClick={scrollToTop}
      aria-label="Go to top"
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
}
