import React, { useEffect, useState } from "react";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";

function Hero() {
  const [status, setStatus] = useState({ message: "Loading..." });

  const fetchStatus = () => {
    return fetch("/api/status")
      .then((response) => response.json())
      .then((data) => setStatus(data));
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
      <ArrowPathIcon className="animate-slow mx-auto h-16 w-16" />
      <div className="text-center">
        <h1 className="mt-16 text-7xl font-bold tracking-tight text-gray-900 md:text-9xl">
          E<span className="text-green-800">x</span>eChange
        </h1>
        <p className="mt-6 text-xl leading-7 text-gray-800 md:text-4xl">
          {status.message}
        </p>
      </div>
    </main>
  );
}

export default Hero;
