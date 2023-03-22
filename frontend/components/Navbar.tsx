import React, { useEffect } from "react";
import Logo from "./Logo";
import { Fragment, useState } from "react";
import SingleNotification from "./Notification";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  UserCircleIcon,
  ArrowUpTrayIcon,
  BellIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet } from "react-router-dom";
import { useIsAuthenticated, useAuthUser, useSignOut } from "react-auth-kit";

interface Notification {
  notification_type: string;
  text: string;
  link: string;
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);

  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const signOut = useSignOut();

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = () => {
    if (!isAuthenticated()) {
      return;
    }

    return fetch("/api/getnotifications")
      .then((response) => response.json())
      .then((data) => setNotifications(data.notifications));
  };

  // fetching notifications every 5 seconds when a user is logged in
  // notifications are also checked when bell icon is clicked
  useEffect(() => {
    const interval = setInterval(() => { // if two people use the site it will literally break it if we leave this in 

      fetchNotifications();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  const navigation = [
    { name: "Home", to: "/" },
    { name: "Marketplace", to: "/marketplace" },
    isAuthenticated() && { name: "Trade Centre", to: "/tradecentre" },
  ];

  return (
    <>
      <div className="bg-white">
        {/* Mobile Menu */}
        <Transition.Root show={openMenu} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setOpenMenu}
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
                  <div className="flex h-16 px-4 pt-4 pb-2">
                    <button
                      type="button"
                      className="group -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpenMenu(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Links */}

                  <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                    {navigation.map(
                      (page) =>
                        page != false && (
                          <div key={page.name} className="flow-root">
                            <Link
                              to={page.to}
                              className="-m-2 block p-2 font-medium text-gray-900"
                              onClick={() => setOpenMenu(false)}
                            >
                              {page.name}
                            </Link>
                          </div>
                        )
                    )}
                  </div>
                  {!isAuthenticated() && (
                    <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                      <div className="flow-root">
                        <Link
                          to="/login"
                          className="-m-2 block p-2 font-medium text-gray-900"
                          onClick={() => setOpenMenu(false)}
                        >
                          Login
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to="/register"
                          className="-m-2 block p-2 font-medium text-gray-900"
                          onClick={() => setOpenMenu(false)}
                        >
                          Register
                        </Link>
                      </div>
                    </div>
                  )}
                  {isAuthenticated() && (
                    <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                      <div className="flow-root">
                        <Link
                          to="/profile"
                          className="-m-2 flex items-center p-2"
                          onClick={() => setOpenMenu(false)}
                        >
                          <UserCircleIcon className="block h-auto w-5 flex-shrink-0" />
                          <span className="ml-3 block font-medium text-gray-900">
                            {auth()?.user}
                          </span>
                        </Link>
                      </div>
                      <div className="flow-root">
                        <button
                          type="button"
                          onClick={() => signOut()}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative bg-white">
          <nav
            aria-label="Top"
            className="fixed top-0 z-40 mx-auto w-full bg-white px-4 sm:px-6 lg:px-8"
          >
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="z-50 rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpenMenu(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <Link to="/">
                    <Logo className="h-6 w-6" />
                  </Link>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {navigation.map(
                      (page) =>
                        page != false && (
                          <Link
                            key={page.name}
                            to={page.to}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            {page.name}
                          </Link>
                        )
                    )}
                  </div>
                </Popover.Group>
                <div className="ml-auto flex items-center">
                  {!isAuthenticated() && (
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <Link
                        to="/login"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Login
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <Link
                        to="/register"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                  {isAuthenticated() && (
                    <>
                      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        <button
                          type="button"
                          onClick={() => signOut()}
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Logout
                        </button>
                      </div>
                      <span
                        className="hidden h-6 w-px bg-gray-200 lg:ml-6 lg:flex"
                        aria-hidden="true"
                      />
                      <div className="hidden lg:ml-6 lg:flex">
                        <Link
                          to="/profile"
                          className="flex items-center text-gray-700 hover:text-gray-800"
                        >
                          <UserCircleIcon className="block h-auto w-5 flex-shrink-0" />
                          <span className="ml-3 block text-sm font-medium">
                            {auth()?.user}
                          </span>
                        </Link>
                      </div>
                    </>
                  )}

                  {/* Notifications */}
                  {isAuthenticated() && (
                    <>
                      <div className="ml-4 flow-root lg:ml-6">
                        <Popover className="relative">
                          {() => (
                            <>
                              <Popover.Button
                                className={`group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                              >
                                
                                <BellIcon
                                  className="h-6 w-6 text-gray-400 hover:text-gray-500"
                                  aria-hidden="true"
                                  onClick={() => fetchNotifications()}
                                />
                              </Popover.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                              >
                                <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                  <ul>
                                    {notifications.map((notification) => (
                                      <SingleNotification {...notification} />
                                    ))}
                                  </ul>
                                  <div className="bg-gray-500 rounded-md overflow-hidden text-sm text-center"> here is a div for reference </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      </div>

                    </>
                  )}

                  {/* Search */}
                  <div className="flex lg:ml-6">
                    <Link
                      to="/marketplace"
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>

                  {/* Upload */}
                  {isAuthenticated() && (
                    <div className="ml-4 flow-root lg:ml-6">
                      <Link
                        to="/upload"
                        className="group -m-2 flex items-center rounded-md bg-green-800 p-2 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
                      >
                        <ArrowUpTrayIcon
                          className="stroke-white-800 group-hover:stroke-white-600 h-5 w-5 flex-shrink-0 stroke-2"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
      <div className="mt-16">
        <Outlet />
      </div>
    </>
  );
}
