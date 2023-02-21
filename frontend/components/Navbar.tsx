import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  UserCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet } from "react-router-dom";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Marketplace", to: "/marketplace" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white">
        {/* Mobile Menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pt-5 pb-2">
                    <button
                      type="button"
                      className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Links */}

                  <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                    {navigation.map((page) => (
                      <div key={page.name} className="flow-root">
                        <Link
                          to={page.to}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          {page.name}
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                    <div className="flow-root">
                      <Link
                        to="/login"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Login
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link
                        to="/register"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Register
                      </Link>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4">
                    <Link to="#" className="-m-2 flex items-center p-2">
                      <UserCircleIcon className="block h-auto w-5 flex-shrink-0" />
                      <span className="ml-3 block text-base font-medium text-gray-900">
                        Profile
                      </span>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative bg-white">
          <nav aria-label="Top" className="w-full fixed top-0 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <Link to="#">
                    <ArrowPathIcon className="h-8 w-auto" />
                  </Link>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {navigation.map((page) => (
                      <Link
                        key={page.name}
                        to={page.to}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </Popover.Group>

                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link
                      to="/login"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Login
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link
                      to="/register"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Register
                    </Link>
                  </div>

                  <div className="hidden lg:ml-8 lg:flex">
                    <Link
                      to="#"
                      className="flex items-center text-gray-700 hover:text-gray-800"
                    >
                      <UserCircleIcon className="block h-auto w-5 flex-shrink-0" />
                      <span className="ml-3 block text-sm font-medium">
                        Your Profile
                      </span>
                      <span className="sr-only">, change currency</span>
                    </Link>
                  </div>

                  {/* Search */}
                  <div className="flex lg:ml-6">
                    <Link
                      to="#"
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <Link to="#" className="group -m-2 flex items-center p-2">
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="sr-only">items in cart, view bag</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
