import React, { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Calendar from "react-calendar";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
import { Product } from "./Itemtile";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";

interface ProfileData {
  levelPercent: number;
  name: string;
  level: number;
}




export function Trading(product: Product) {
  const [requestMessage, setRequestMessage] = useState("");
  const [profileData, setProfileData] = useState<ProfileData>();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function fetchProfileData() {
    return fetch("/api/profiledata")
      .then((response) => response.json())
      .then((data) => setProfileData(data));
  }

  useEffect(() => {
    fetchProfileData();
  }, []);
  const handleSubmit = async (e) => {
    // this function sends form data to /api/trade
    e.preventDefault();

    const items = [product.id];       // item(s) you are asking for 
    const giver = product.owner.id;   // person you are asking for item from 
    const message = requestMessage
    await axios
      .post(
        "/api/trade/new",
        JSON.stringify({
          giver,           
          items,          //[] of itemIds
          message, 
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
          <div className="flex items-center justify-between px-4 pt-12">
            <UserCircleIcon className="h-16 w-16" />
            <div className="flex w-9/12 items-center">
              <div className="flex w-10/12 flex-col pl-4 leading-none">
                <p className="text-sm font-bold">{product.owner.username}</p>
                <p className="pt-1 text-sm font-light text-gray-800">
                  Level {profileData?.level}
                </p>
                <div className="mb-1 text-base font-medium text-green-700 dark:text-green-500"></div>
                <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-2.5 rounded-full bg-green-600 dark:bg-green-500"
                    style={{ width: profileData?.levelPercent + "%" }}
                  >
                  </div>
                </div>
              </div>
              <div className="w-2/12">
                <div>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M9.243 19H21v2H3v-4.243l9.9-9.9 4.242 4.244L9.242 19zm5.07-13.556l2.122-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z" /></svg> */}
                </div>
              </div>
            </div>
          </div>

       

        <div className="mt-2 mb-2 absolute py-10"> 
          <p className="text-sm text-gray-500">   
              {product.description}  
          </p> 
        </div>

          <form method="POST" onSubmit={handleSubmit} className="mt-[6rem]">

           <div className="">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Write a message with your request!</label>
              <textarea id="message" value = {requestMessage} onChange={(e)=> setRequestMessage(e.target.value)} className="row-span-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Here, you can let the trader know when you're free or discuss any other details about your request..."></textarea>
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
