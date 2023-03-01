import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Calendar from "react-calendar";
import axios from "axios";
/* import 'react-calendar/dist/Calendar.css';
 */ axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
import { useAuthUser } from "react-auth-kit";
import { Itemtile, Product } from "./Itemtile"
import { ProfileData } from "../Profile/Profile";


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



function Trading(product: Product) {
  const auth = useAuthUser();
  const [open, setOpen] = useState(false);
  const [selectedDates, onDatesChange] = useState(new Date());

  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedTime, setSelectedTime] = useState(times[0]);

  const [profileData, setProfileData] = useState<ProfileData>();

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
    <div className="group relative">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                      <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <img
                          src={product.image}
                          className="object-cover object-center"
                        />
                        <div>
                          <h1>{product.owner.username}</h1>
                        </div>
                      </div>

                      <div className="mt-10 sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                          {product.caption}
                        </h2>

                        <section
                          aria-labelledby="options-heading"
                          className="mt-10"
                        >
                          <h3 id="options-heading">
                            {product.tags.map((t) => t.value)}
                          </h3>
                          {/* All form questions down here - stuff above is responsible for the pop up window when clicking on an item 

                        following code was used for the date/time picker from the @rehookify headlessui thing.

                        */}
                          <form method="POST" onSubmit={handleSubmit}>
                            {/*Location drop down menu*/}
                            <Listbox
                              value={selectedLocation}
                              onChange={setSelectedLocation}
                            >
                              {({ open }) => (
                                <>
                                  <Listbox.Label className="block text-sm font-medium text-gray-700">
                                    Select trade location
                                  </Listbox.Label>
                                  <div className="relative mt-1">
                                    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-[#1d8d35] focus:outline-none focus:ring-1 focus:ring-[#1d8d35]  sm:text-sm">
                                      <span className="flex items-center">
                                        <span className="ml-3 block truncate">
                                          {selectedLocation.locationName}
                                        </span>
                                      </span>
                                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                          className="h-5 w-5 text-gray-400"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </Listbox.Button>
                                    <Transition
                                      show={open}
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
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
                                            value={location}
                                          >
                                            {({ selected, active }) => (
                                              <>
                                                <div className="flex items-center">
                                                  <span
                                                    className={classNames(
                                                      selected
                                                        ? "font-semibold"
                                                        : "font-normal",
                                                      "ml-3 block truncate"
                                                    )}
                                                  >
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
                                                    )}
                                                  >
                                                    <CheckIcon
                                                      className="h-5 w-5"
                                                      aria-hidden="true"
                                                    />
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

                            <Listbox
                              value={selectedTime}
                              onChange={setSelectedTime}
                            >
                              {({ open }) => (
                                <>
                                  <Listbox.Label className="block text-sm font-medium text-gray-700">
                                    Select time
                                  </Listbox.Label>
                                  <div className="relative mt-1">
                                    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-[#1d8d35]  focus:outline-none focus:ring-1 focus:ring-[#1d8d35] sm:text-sm">
                                      <span className="flex items-center">
                                        <span className="ml-3 block truncate">
                                          {selectedTime.time}
                                        </span>
                                      </span>
                                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                          className="h-5 w-5 text-gray-400"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </Listbox.Button>
                                    <Transition
                                      show={open}
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
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
                                            value={time}
                                          >
                                            {({ selected, active }) => (
                                              <>
                                                <div className="flex items-center">
                                                  <span
                                                    className={classNames(
                                                      selected
                                                        ? "font-semibold"
                                                        : "font-normal",
                                                      "ml-3 block truncate"
                                                    )}
                                                  >
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
                                                    )}
                                                  >
                                                    <CheckIcon
                                                      className="h-5 w-5"
                                                      aria-hidden="true"
                                                    />
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
                            <div>
                              <Calendar
                                onChange={onDatesChange}
                                value={selectedDates}
                                minDate={new Date()}
                              />
                            </div>

                            <button
                              type="submit"
                              className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-[#17742b] py-3 px-8 text-base font-medium text-white hover:bg-[#17742b] focus:outline-none focus:ring-2 focus:ring-[#1d8d35] focus:ring-offset-2"
                            >
                              Request trade!
                            </button>
                          </form>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <button
        type="button"
        className="z-50 rounded-md bg-white p-2 text-gray-400"
        onClick={() => setOpen(true)}
      >
        <Itemtile key={product.id} {...product}/>
      </button>
    </div>
  );
}

export default Trading;