import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ArrowDownRightIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { TradeInvolvement } from "../TradeCenter";
import TradeResponse from "../TradeResponse";

export default function PendingGiverTradeView(trade: TradeInvolvement) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-3 text-left text-sm font-medium text-black shadow hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus-visible:ring-opacity-75">
            <ArrowDownRightIcon className="h-5 w-5 stroke-green-800 stroke-[3]"></ArrowDownRightIcon>
            <span>
              {" "}
              <b>
                {" "}
                Incoming trade request from {trade.receiver.username}{" "}
              </b>{" "}
            </span>
            <ChevronUpIcon
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 stroke-[3] text-green-800`}
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
            <Disclosure.Panel
              static
              className="overflow-hidden rounded-md px-4 pt-4 pb-2 text-sm text-gray-500 shadow"
            >
              <TradeResponse {...trade} />
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
