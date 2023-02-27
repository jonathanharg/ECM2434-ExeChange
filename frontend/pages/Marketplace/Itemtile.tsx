import React, { Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import axios from "axios";
import {
  DatePickerStateProvider,
  useContextCalendars,
  useContextDays,
  useContextMonthsPropGetters,
} from "@rehookify/datepicker";
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { Button, Calendar, Time } from '../../components';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export interface Product {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  tags: string[];
}

function Root() {
  const { calendars } = useContextCalendars();
  const { formattedDates } = useContextDays();
  const { previousMonthButton, nextMonthButton } = useContextMonthsPropGetters()


  return (
    <div>
      <h1 className="text-2xl w-full text-center mb-6">
        {formattedDates[formattedDates.length - 1]}
      </h1>
      <main className="grid grid-cols-main-time gap-x-6">
        <div className="block p-4 border border-slate-300 rounded shadow-xs shadow shadow-slate-300">
          <Calendar
            prevButton={
              <Button className="w-8" {...previousMonthButton()}>
                <IoChevronBack />
              </Button>
            }
            nextButton={
              <Button className="w-8" {...nextMonthButton()}>
                <IoChevronForward />
              </Button>
            }
            calendar={calendars[0]}
          />
        </div>
        <div className="block p-4 border border-slate-300 rounded shadow-xs shadow shadow-slate-300">
          <Time />
        </div>
      </main>
    </div>
  );
}

function Itemtile(product: Product) {
  const [open, setOpen] = useState(false)
  const [selectedDates, onDatesChange] = useState<Date[]>([]);
  /* const [ date, setDate] = useState("");
  const [ time, setTime] = useState(""); */


  const handleSubmit = async (e) => {
    // this function sends form data to /api/trading
    e.preventDefault();
  
    await axios
      .post("/api/trading", JSON.stringify({ selectedDates }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        // TODO: Handle more responses than just OK
        if (response.data.status != "OK") {
          /* setEmailError("Incorrect username or password");
          setPasswordError("Incorrect username or password"); */
          console.log("Incorrect username or password!");
          return;
        }
  
        /* if (attemptAuth) {
          console.log("User logged in!");
          navigate("/");
        } else {
          //Print error as react-auth-kit broke!
          console.log("React-auth-kit error!");
        } */
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
                        <img src={product.imageSrc} className="object-cover object-center" />
                    </div>

                    <div className="mt-10 sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.name}</h2>

                        <section aria-labelledby="options-heading" className="mt-10">
                        <h3 id="options-heading">
                          {product.tags}
                        </h3>
                        {/* All form questions down here - stuff above is responsible for the pop up window when clicking on an item 
                        
                        
                        https://codesandbox.io/p/sandbox/time-picker-with-multiple-dates-lf36qc?file=%2Fsrc%2Fclassnames-utils.ts
                        https://github.com/rehookify/datepicker
                        
                        following code was used for the date/time picker from the @rehookify headlessui thing.

                        */}
                        <form method="POST" onSubmit={handleSubmit}>
                          <DatePickerStateProvider config={{
                            selectedDates,
                            onDatesChange,
                            dates: {
                              mode: 'multiple',
                              toggle: true,
                            },
                            locale: {
                              options: {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                                hour12: true,
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            },
                          }}>
                            <Root />
                          </DatePickerStateProvider>
                            <button
                            type="submit"
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
      <div key={product.id} className="group relative">
        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={product.imageSrc}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.tags}</p>
          </div>
        </div>
      </div>
      </button>
    </div>

    
  );
}

export default Itemtile;
