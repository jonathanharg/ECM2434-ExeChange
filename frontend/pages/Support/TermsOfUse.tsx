import React from "react";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export function DeleteItem() {
  return (
    <main className="py-18 min-h-full place-items-center bg-white px-6 sm:py-16 lg:px-8">
      <div className="text-center">
        <h1 className="mt-16 text-7xl font-bold tracking-tight text-gray-900 md:text-9xl">
          E<span className="text-green-800">x</span>eChange
        </h1>
        <p className="mt-6 text-xl leading-7 text-gray-800 md:text-4xl"></p>
      </div>
    </main>
  );
}

export default DeleteItem;
