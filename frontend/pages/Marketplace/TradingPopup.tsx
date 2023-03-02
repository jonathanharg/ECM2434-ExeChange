import React, { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Calendar from "react-calendar";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
import { Product } from "./Itemtile"
import ProfileData  from "../Profile/Profile";


const locations = [
  {
    id: 1,
    locationName: "Lafrowda",
  },
  {
    id: 2,
    locationName: "Forum",
  },
  {
    id: 3,
    locationName: "Holland Hall",
  },
  {
    id: 4,
    locationName: "Sanctuary",
  },
  {
    id: 5,
    locationName: "Business School",
  },
];

const times = [
  { id: 1, time: "09:00" },
  { id: 2, time: "09:30" },
  { id: 3, time: "10:00" },
  { id: 4, time: "10:30" },
  { id: 5, time: "11:00" },
  { id: 6, time: "11:30" },
  { id: 7, time: "12:00" },
  { id: 8, time: "12:30" },
  { id: 9, time: "13:00" },
  { id: 10, time: "13:30" },
  { id: 11, time: "14:00" },
  { id: 12, time: "14:30" },
  { id: 13, time: "15:00" },
  { id: 14, time: "15:30" },
  { id: 15, time: "16:00" },
  { id: 16, time: "16:30" },
  { id: 17, time: "17:00" },
];



export function Trading(product: Product) {

  const [selectedDates, onDatesChange] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedTime, setSelectedTime] = useState(times[0]);
  const [profileData, setProfileData] = useState<typeof ProfileData>();

  function fetchProfileData() {
    return fetch("/api/profiledata")
      .then((response) => response.json())
      .then((data) => setProfileData(data));
  }

  useEffect(() => {
    fetchProfileData();
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const handleSubmit = async (e) => {
    // this function sends form data to /api/trade
    e.preventDefault();

    const productOwnerId = product.owner.id;
    const itemId = product.id;

    await axios
      .post(
        "/api/trade",
        JSON.stringify({
          productOwnerId,
          selectedDates,
          selectedTime,
          selectedLocation,
          itemId,
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
      <img src={product.image} className=" object-cover object-center"/>
    </div>
    <h3 className="text-2xl mt-5 font-bold text-gray-900 sm:pr-12"> {product.caption} </h3>
    <p className="mt-1 text-sm text-gray-500">
      <b>Tagged by {product.owner.username} as: </b>{product.tags.map((t) => t.value).join(", ")}
    </p>
    </div>
    <div className="sm:col-span-8 lg:col-span-7">
      <section aria-labelledby="options-heading">
        <form method="POST" onSubmit={handleSubmit} className="">
          {/*Location drop down menu*/}
          <Listbox value={selectedLocation} onChange={setSelectedLocation}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-bold text-gray-700 py-2">
                  Select trade location
                </Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-[#1d8d35] focus:outline-none focus:ring-1 focus:ring-[#1d8d35]  sm:text-sm">
                    <span className="flex items-center">
                      <span className="ml-3 block truncate">
                        {selectedLocation.locationName}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </span>
                  </Listbox.Button>
                  <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {locations.map((location) => (
                        <Listbox.Option
                          key={location.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "bg-[#17742b] text-white"
                                : "text-gray-900",
                              "relative cursor-default select-none py-2 pl-3 pr-9"
                            )
                          }
                          value={location}>
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={classNames(
                                    selected
                                      ? "font-semibold"
                                      : "font-normal",
                                    "ml-3 block truncate"
                                  )}>
                                  {location.locationName}
                                </span>
                              </div>
                              {selected ? (
                                <span
                                  className={classNames(
                                    active
                                      ? "text-white"
                                      : "text-[#17742b]",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}>
                                  <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>

          {/*Time picker*/}

          <Listbox value={selectedTime} onChange={setSelectedTime}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-bold py-2 text-gray-700 mt-[1rem]">
                  Select time
                </Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-[#1d8d35]  focus:outline-none focus:ring-1 focus:ring-[#1d8d35] sm:text-sm">
                    <span className="flex items-center">
                      <span className="ml-3 block truncate">
                        {selectedTime.time}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </span>
                  </Listbox.Button>
                  <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {times.map((time) => (
                        <Listbox.Option
                          key={time.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "bg-green-700 text-white"
                                : "text-gray-900",
                              "relative cursor-default select-none py-2 pl-3 pr-9"
                            )
                          }
                          value={time}>
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={classNames(
                                    selected
                                      ? "font-semibold"
                                      : "font-normal",
                                    "ml-3 block truncate"
                                  )}>
                                  {time.time}
                                </span>
                              </div>
                              {selected ? (
                                <span
                                  className={classNames(
                                    active
                                      ? "text-white"
                                      : "text-green-800",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}>
                                  <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
          <div className="sm:ml-0 lg:ml-7 mt-[1.75rem]">
            <Calendar onChange={onDatesChange} value={selectedDates} minDate={new Date()}/>
          </div>
          <button
            type="submit"
            className="mt-[3rem] flex w-full items-center justify-center rounded-md border border-transparent bg-[#17742b] py-3 px-8 text-base font-bold text-white hover:bg-[#17742b] focus:outline-none focus:ring-2 focus:ring-[#1d8d35] focus:ring-offset-2">
            Request trade with {product.owner.username}!
          </button>
        </form>
      </section>
    </div>
  </div>    
  );
}

export default Trading;
