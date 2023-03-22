import React from "react";
import { useRouteError } from "react-router-dom";
import Navbar from "../components/Navbar";

function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <Navbar />
      <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-16 text-5xl font-bold tracking-tight text-gray-900 sm:text-9xl">
            Uh Oh!
          </h1>
          <p className="mt-6 text-2xl leading-7 text-gray-600">
            An unknown error has occurred :(
          </p>
        </div>
      </main>
    </>
  );
}

export default Error;
