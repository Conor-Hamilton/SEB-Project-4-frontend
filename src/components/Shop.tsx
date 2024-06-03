import React, { useState, useEffect } from "react";

export default function ShopOpeningCountdown() {
  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = getTimeUntilLaunch();
      setCountdown(timeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeUntilLaunch = () => {
    const launchDate = new Date("2024-06-31").getTime(); 
    const now = new Date().getTime();
    const distance = launchDate - now;
    return Math.max(0, distance);
  };

  const [countdown, setCountdown] = useState(getTimeUntilLaunch());

  const formatTime = (time: number) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-5 border rounded-lg shadow-lg bg-white animate-pulse">
        <h1 className="text-4xl font-bold text-[#2E1A47] mb-2">Coming Soon!</h1>
        <p className="text-[#2E1A47] mb-4">
          Our shop is almost ready to launch. Stay tuned!
        </p>
        <div className="text-lg font-semibold text-[#2E1A47]">
          Countdown to Launch:
          <p className="text-2xl text-[#2E1A47]">{formatTime(countdown)}</p>
        </div>
      </div>
    </div>
  );
}
