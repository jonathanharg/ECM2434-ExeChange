import React from 'react';
import { Disclosure, Transition } from "@headlessui/react";
import { ArrowDownRightIcon, ArrowUpRightIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { TradeInvolvement } from "./TradeCenter";
import TradeResponse from "./TradeResponse";

export default function PendingReceiverTradeView (trade:TradeInvolvement) {
return ( 
  <Disclosure>
  {({ open }) => (
    <>
      <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white shadow px-4 py-3 text-left text-sm font-medium text-black hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus-visible:ring-opacity-75">
        <ArrowUpRightIcon className="h-5 w-5 stroke-green-800 stroke-[3] ">
        </ArrowUpRightIcon> 
        <span><b> You sent a trade to {trade.giver.username}! </b> </span>
        <ChevronUpIcon
          className={`${
            open ? 'rotate-180 transform' : ''
          } h-5 w-5 text-green-800 stroke-[3]`}
        />
      </Disclosure.Button>
      <Transition
        show={open}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 shadow rounded-md overflow-hidden">
        <div className="flex flex-col items-center overflow-hidden rounded-lg p-4">
          {trade.giver_giving.length == 1 ? (
            <>
            <h3 className="text-xl font-bold text-gray-900">
              {" "}
              You requested the {trade.giver_giving.map((i) => i.caption)}{" "}
            </h3>
            <div className="flex w-full justify-center p-2">
              {trade.giver_giving.map((i) => (
                <div
                  key={i.id}
                  className="relative w-1/4 overflow-hidden rounded-lg font-bold text-gray-900 hover:opacity-75"
                >
                  <img draggable={false} tabIndex={1} src={i.image} />
                </div>
              ))}
            </div>
            <div className={trade.message === ""  ? "hidden":" " }> 
              <p className="pt-2 text-sm text-gray-500">
                <b> Message from {trade.receiver.username}: </b> {trade.message}
              </p>
            </div>
            </> 
            ): (          
              <>
              <h3 className="text-xl font-bold text-gray-900">
                {" "}
                You requested the following items: {" "}
              </h3>
              <div className="container mx-auto grid grid-flow-dense grid-cols-4 gap-2 overflow-hidden rounded-md p-4 py-1">
                {trade.giver_giving.map((i) => (
                  <div
                    key={i.id}
                    className="relative w-full overflow-hidden rounded-lg text-sm font-bold text-gray-900 hover:opacity-75"
                  >
                    <img draggable={false} tabIndex={1} src={i.image} />
                  </div>
                ))}
              </div>
              <div className={trade.message === ""  ? "hidden":" " }> 
                <p className="pt-2 text-sm text-gray-500">
                  <b> Message from {trade.receiver.username}: </b> {trade.message}
                </p>
              </div>
            </>
            
            )}
          </div>
        </Disclosure.Panel>
      </Transition>
    </>
  )}
</Disclosure>
)
}