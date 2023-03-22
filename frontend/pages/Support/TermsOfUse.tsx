import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Product } from "../Marketplace/Itemtile";
import { TrashIcon } from "@heroicons/react/24/outline";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export function DeleteItem() {
  
  return (
   
   <main className="min-h-full place-items-center bg-white py-18 px-6 sm:py-16 lg:px-8">
      <div className="text-center">
        <h1 className="mt-16 text-7xl font-bold tracking-tight text-gray-900 md:text-9xl">
          E<span className="text-green-800">x</span>eChange
        </h1>
        <p className="mt-6 text-xl leading-7 text-gray-800 md:text-4xl">
        </p>
      </div>
    </main>
  );
}

export default DeleteItem;
