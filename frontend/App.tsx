import React, { useEffect, useState } from "react";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";

function App() {
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
        <h1 className="mt-16 text-5xl font-bold tracking-tight text-gray-900 sm:text-9xl">
          E<span className="text-green-800">x</span>eChange
        </h1>
        <p className="mt-6 text-2xl leading-7 text-gray-600">
          {status.message}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="https://github.com/jonathanharg/ExeChange"
            className="rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
          >
            GitHub
          </a>
          {/* TODO: This should use a <Link> element
              see https://reactrouter.com/en/main/components/link
          */}
          <a href="/login" className="text-sm font-semibold text-gray-900">
            Login <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}

export default App;
