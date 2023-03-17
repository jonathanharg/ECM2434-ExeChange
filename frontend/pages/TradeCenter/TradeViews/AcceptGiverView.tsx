import { Disclosure, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  CheckIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

import React from "react";
import { TradeInvolvement } from "../TradeCenter";

export default function AcceptGiverView(trade: TradeInvolvement) {
  const Datetime = trade.time;
  const meetingTime = Datetime.split("T")[1]?.replace(":00Z", "");
  const meetingDay = Datetime.split("T")[0];

  return (
    <div>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-green-700 px-4 py-3 text-left text-sm font-medium text-white shadow hover:bg-green-600 focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus-visible:ring-opacity-75">
              <CheckIcon className="h-5 w-5 stroke-white stroke-[3]"></CheckIcon>
              <span>
                {" "}
                You accepted <b>
                  {trade.receiver.username}&apos;s
                </b> request!{" "}
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
                <div className="flex w-full flex-col items-center justify-center">
                  {trade.receiver_exchanging.length == 0 ? (
                    <div>
                      You&apos;re giving away these items to{" "}
                      <b>{trade.receiver.username}</b> at <b>{meetingTime}</b>{" "}
                      at <b> {trade.location.name}</b> on <b>{meetingDay} </b>
                      <div className="flex w-full justify-between p-2">
                        {trade.giver_giving.map((i) => (
                          <div
                            key={i.id}
                            className="relative w-1/4  overflow-hidden rounded-md font-bold text-gray-900 hover:opacity-75"
                          >
                            <img draggable={false} tabIndex={1} src={i.image} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      You&apos;re trading these items with{" "}
                      <b>{trade.receiver.username}</b> at <b>{meetingTime}</b>{" "}
                      at <b> {trade.location.name}</b> on <b>{meetingDay} </b>
                      <div
                        className={
                          trade.giver_giving.length == 1
                            ? "flex w-full justify-center p-2"
                            : "flex w-full justify-between p-2"
                        }
                      >
                        {trade.giver_giving.map((i) => (
                          <div
                            key={i.id}
                            className="relative w-1/4 overflow-hidden rounded-lg font-bold text-gray-900 hover:opacity-75"
                          >
                            <img draggable={false} tabIndex={1} src={i.image} />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center">
                        <ArrowPathIcon className="h-10 w-10 stroke-[3] text-green-800"></ArrowPathIcon>
                      </div>
                      <div
                        className={
                          trade.receiver_exchanging.length == 1
                            ? "flex w-full justify-center p-2"
                            : "flex w-full justify-between p-2"
                        }
                      >
                        {trade.receiver_exchanging.map((i) => (
                          <div
                            key={i.id}
                            className="relative w-1/4 overflow-hidden rounded-lg font-bold text-gray-900 hover:opacity-75"
                          >
                            <img draggable={false} tabIndex={1} src={i.image} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
