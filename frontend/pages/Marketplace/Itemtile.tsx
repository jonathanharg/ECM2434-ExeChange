import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Trading } from "./TradingPopup";
import { useAuthUser } from "react-auth-kit";

export interface Product {
  id: number;
  caption: string;
  href: string;
  image: string;
  tags: tag[];
  owner: owner;
}

export type owner = {
  id: number;
  username: string;
};

export type tag = {
  id: number;
  readonly value: string;
  label: string;
};
export function Itemtile(product: Product) {
  /* , {trading}:boolean */
  const [open, setOpen] = useState(false);
  const auth = useAuthUser();
  return (
    <div key={product.id} className="group relative rounded-md p-4 shadow">
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
                  <div className="relative flex w-full items-center overflow-hidden rounded-md bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    {/* if(trading) {  } */}
                    {/* ADD IF CONDITION HERE - IF TRADING then : otherwise idk not that  */}
                    <Trading key={product.id} {...product} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="min-h-80 aspect-w-3 aspect-h-4 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
        <img
          draggable={false}
          tabIndex={1}
          src={product.image}
          className={
            auth()
              ? "h-full w-full object-cover object-center"
              : "blur-lg lg:h-full lg:w-full"
          }
          onClick={() => setOpen(true)}
        />
      </div>

      <div className="mt-2 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={product.href}>{product.caption}</a>
          </h3>
          <h6>
            <a href="#" className="mt-1 text-xs text-gray-700">
              {product.owner.username}
            </a>
          </h6>
          <p className="mt-1 text-sm text-gray-500">
            {product.tags.map((t) => t.value).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Itemtile;
