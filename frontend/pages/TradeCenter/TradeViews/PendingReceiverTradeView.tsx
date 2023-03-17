import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ArrowUpRightIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { TradeInvolvement } from "../TradeCenter";

export default function PendingReceiverTradeView(trade: TradeInvolvement) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-3 text-left text-sm font-medium text-black shadow hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus-visible:ring-opacity-75">
            <ArrowUpRightIcon className="h-5 w-5 stroke-green-800 stroke-[3] "></ArrowUpRightIcon>
            <span>
              <b> You sent a trade to {trade.giver.username}! </b>{" "}
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
            <Disclosure.Panel className="overflow-hidden rounded-md px-4 pt-4 pb-2 text-sm text-gray-500 shadow">
              <div className="flex w-full flex-col items-center justify-center">
                {trade.giver_giving.length == 1 ? (
                  <>
                    <h3 className="text-xl font-bold text-gray-900">
                      {" "}
                      You requested the{" "}
                      {trade.giver_giving.map((i) => i.caption)}{" "}
                    </h3>
                    <div className="flex w-full justify-between p-2">
                      {trade.giver_giving.map((i) => (
                        <div
                          key={i.id}
                          className="relative w-1/4 overflow-hidden rounded-lg font-bold text-gray-900 hover:opacity-75"
                        >
                          <img draggable={false} tabIndex={1} src={i.image} />
                        </div>
                      ))}
                    </div>
                    <div className={trade.message === "" ? "hidden" : " "}>
                      <p className="pt-2 text-sm text-gray-500">
                        <b> You said: </b> {trade.message}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-gray-900">
                      {" "}
                      You requested the following items:{" "}
                    </h3>
                    <div className="flex w-full justify-between p-2">
                      {trade.giver_giving.map((i) => (
                        <div
                          key={i.id}
                          className="relative w-1/4 overflow-hidden rounded-lg font-bold text-gray-900 hover:opacity-75"
                        >
                          <img draggable={false} tabIndex={1} src={i.image} />
                        </div>
                      ))}
                    </div>
                    <div className={trade.message === "" ? "hidden" : " "}>
                      <p className="pt-2 text-sm text-gray-500">
                        <b> You said: </b> {trade.message}
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
  );
}
