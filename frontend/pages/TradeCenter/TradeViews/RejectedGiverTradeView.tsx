import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import {
  ArrowDownRightIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { TradeInvolvement } from "../TradeCenter";
import TradeResponse from "../TradeResponse";

export default function RejectedGiverTradeView(trade: TradeInvolvement) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-red-800 px-4 py-3 text-left text-sm font-medium text-white shadow hover:bg-red-600 focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus-visible:ring-opacity-75">
            <XMarkIcon className="h-5 w-5 stroke-white stroke-[3]"></XMarkIcon>
            <span>
              {" "}
              <b> You rejected {trade.receiver.username}'s request! </b>{" "}
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
            ></Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
