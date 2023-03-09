import React, { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Calendar from "react-calendar";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
import { Product } from "./Itemtile";

export function Trading(product: Product) {


  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const handleSubmit = async (e) => {
    // this function sends form data to /api/trade
    e.preventDefault();

    const to_user = product.owner.id;
    const receiving = [product.id];       // item(s) you are asking for 
    const giving = [];                   // items you are giving in return 

    await axios
      .post(
        "/api/trade/new",
        JSON.stringify({
          to_user,            //used to be productOwnerId
          giving,
          receiving,          //[] of itemIds
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        // TODO: Handle more responses than just OK
        if (response.data.status != "OK") {
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
      <div className="overflow-hidden rounded-lg sm:col-span-4 lg:col-span-5">
        <div className="aspect-w-2 aspect-h-3 mt-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
          <img src={product.image} className=" object-cover object-center" />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-gray-900 sm:pr-12">
          {" "}
          {product.caption}{" "}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          <b>Tagged by {product.owner.username} as: </b>
          {product.tags.map((t) => t.value).join(", ")}
        </p>
      </div>
      <div className="sm:col-span-8 lg:col-span-7">
        <section aria-labelledby="options-heading">


          <div className="desc">  
              {product.description}
          </div>
          <form method="POST" onSubmit={handleSubmit} className="">

           <div className= "">
           <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Write a message with your request!</label>
            <textarea id="message" className="row-span-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Here, you can let the trader know when you're free or discuss any other details about your request..."></textarea>

           </div>
            <button
              type="submit"
              className="mt-[1rem] flex w-full items-center justify-center rounded-md border border-transparent bg-[#17742b] py-3 px-8 text-base font-bold text-white hover:bg-[#17742b] focus:outline-none focus:ring-2 focus:ring-[#1d8d35] focus:ring-offset-2"
            >
              Request trade with {product.owner.username}!
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Trading;
