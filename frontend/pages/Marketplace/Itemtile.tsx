import React, { Fragment, useState } from "react";
import { Combobox, Dialog, RadioGroup, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/24/outline'

export interface Product {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  tags: string[];
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const placeholderReqs = {
  area: [
    { id: 1, name: 'Forum' },
    { id: 2, name: 'test1' },
    { id: 3, name: 'test2' },
    { id: 4, name: 'idaksdksad' },
    { id: 5, name: '12313234' },
    { id: 6, name: 'test3' },
  ],
  hour: [
    { id: 1, name: '00' },{ id: 2, name: '01' },{ id: 3, name: '02' },{ id: 4, name: '03' },{ id: 5, name: '04' },{ id: 6, name: '05' },
    { id: 7, name: '06' },{ id: 8, name: '07' },{ id: 9, name: '08' },{ id: 10, name: '09' },{ id: 11, name: '10' },{ id: 12, name: '11' },
    { id: 13, name: '12' },{ id: 14, name: '13' },{ id: 15, name: '14' },{ id: 16, name: '15' },{ id: 17, name: '16' },{ id: 18, name: '17' },
    { id: 19, name: '18' },{ id: 20, name: '19' },{ id: 21, name: '20' },{ id: 22, name: '21' },{ id: 23, name: '22' },{ id: 24, name: '23' },
  ],
  minute: [
    { id: 1, name: '00' },{ id: 2, name: '05' },{ id: 3, name: '10' },{ id: 4, name: '15' },{ id: 5, name: '20' },{ id: 6, name: '25' },
    { id: 7, name: '30' },{ id: 8, name: '35' },{ id: 9, name: '40' },{ id: 10, name: '45' },{ id: 11, name: '50' },{ id: 12, name: '55' },
  ]
}

function Itemtile(product: Product) {
  const [open, setOpen] = useState(false)
  const [selectedArea, setSelectedArea] = useState(placeholderReqs.area[0])
  const [selectedHour, setSelectedHour] = useState(placeholderReqs.hour[0])
  const [selectedMin, setSelectedMin] = useState(placeholderReqs.minute[0])

  const [queryArea, setQueryArea] = useState('')
  const [queryHour, setQueryHour] = useState('')
  const [queryMin, setQueryMin] = useState('')
  
  /* const filteredArea =
    queryArea === ''
      ? placeholderReqs.area
      : placeholderReqs.area.filter((area) =>
          area.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(queryArea.toLowerCase().replace(/\s+/g, ''))
        )
  const filteredHour =
    queryHour === ''
      ? placeholderReqs.hour
      : placeholderReqs.hour.filter((hour) =>
          hour.name
          parseInt(queryHour)
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(queryHour.toLowerCase().replace(/\s+/g, ''))
        )
  const filteredMin =
    queryMin === ''
      ? placeholderReqs.minute
      : placeholderReqs.minute.filter((min) =>
          min.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(queryMin.toLowerCase().replace(/\s+/g, ''))
        )
   */

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

                        {/* <div className="fixed top-16 w-72">
                          <Combobox value={selectedArea} onChange={setSelectedArea}>
                            <div className="relative mt-1">
                              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                <Combobox.Input
                                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                  displayValue={(person) => person.name}
                                  onChange={(event) => setQueryArea(event.target.value)}
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </Combobox.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQueryArea('')}
                              >
                                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {filteredArea.length === 0 && queryArea !== '' ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                      Nothing found.
                                    </div>
                                  ) : (
                                    filteredArea.map((person) => (
                                      <Combobox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                          }`
                                        }
                                        value={person}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <span
                                              className={`block truncate ${
                                                selected ? 'font-medium' : 'font-normal'
                                              }`}
                                            >
                                              {person.name}
                                            </span>
                                            {selected ? (
                                              <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                  active ? 'text-white' : 'text-teal-600'
                                                }`}
                                              >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Combobox.Option>
                                    ))
                                  )}
                                </Combobox.Options>
                              </Transition>
                            </div>
                          </Combobox>
                        </div> */}
                      
                        <form>
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
