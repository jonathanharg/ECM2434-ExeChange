import {
  ArrowDownLeftIcon,
  ArrowDownRightIcon,
  ArrowRightCircleIcon,
  ArrowUpRightIcon,
  InboxArrowDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Console } from "console";
import { setFips } from "crypto";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Product } from "../Marketplace/Itemtile";
import { TradeInvolvement } from "./TradeCenter";
import { Dialog, Popover, Transition } from "@headlessui/react";
import TradeResponse from "./TradeResponse";
import { usePopper } from "react-popper";
import TradingPopup from "../Marketplace/TradingPopup";

type ProfileData = {
  levelPercent: number;
  name: string;
  level: number;
};

export default function TradeAlerts(trade: TradeInvolvement) {
  const [profileData, setProfileData] = useState<ProfileData>();
  const [tradeResponseRef, setTradeResponseRef] = useState();
  const { styles, attributes } = usePopper(tradeResponseRef);
  
  function fetchProfileData() {
    return fetch("/api/profiledata")
      .then((response) => response.json())
      .then((data) => setProfileData(data));
  }

  useEffect(() => {
    fetchProfileData();
  }, []);
  return (
    // <div className="flex w-full flex-col px-4 pt-12">
    //     Incoming trade request from {" "}
    //     {trades.map((trade) => (
    //         trade.receiver.username
    //     ))} !!!
    // </div>

    <div className="justify-right grid w-full grid-cols-1 items-center p-2">
      {trade.receiver.username != profileData?.name ? (
        /* Incoming trade toast  */
        <div
          id="toast-default"
          className={
            "flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow"
          }
          role="alert"
        >
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
            <ArrowDownRightIcon className="h-5 w-5 stroke-green-800 stroke-2">
              {" "}
            </ArrowDownRightIcon>
          </div>

          <div className="ml-3 text-sm font-bold text-gray-900">
            {" "}
            Incoming trade request from {trade.receiver.username} !
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <Popover className="relative">
              {() => (
                <>
                  <Popover.Button
                    type="button"
                    className="inline-flex h-8 w-8 rounded-lg bg-green-800 p-1.5 text-gray-600 hover:bg-green-700 hover:text-gray-900 focus:ring-2 focus:ring-gray-300"
                  >
                    <InboxArrowDownIcon className="h-5 w-5 stroke-white">
                      {" "}
                    </InboxArrowDownIcon>
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
                    <Popover.Panel
                      ref={setTradeResponseRef}
                      style={styles.popper}
                      {...attributes.popper}
                      className=" right-3/4 z-10 mt-3 w-[30vw] max-w-sm  transform overflow-hidden rounded-md bg-white px-4 pr-4 shadow-2xl sm:px-0 lg:max-w-3xl"
                    >
                      <TradeResponse {...trade} />
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
      ) : (
        /* Outgoing trade toast  */
        <div
          id="toast-default"
          className={
            "flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow"
          }
          role="alert"
        >
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
            <ArrowUpRightIcon className="h-5 w-5 stroke-green-800 stroke-2">
              {" "}
            </ArrowUpRightIcon>
          </div>

          <div className="ml-3 text-sm font-bold text-gray-900">
            {" "}
            You sent a trade request to {trade.giver.username}!
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <button
              type="button"
              className="inline-flex h-8 w-8 rounded-lg bg-green-800 p-1.5 text-gray-400 hover:bg-green-700 hover:text-gray-900 focus:ring-2 focus:ring-gray-300"
            >
              <InboxArrowDownIcon className="h-5 w-5 stroke-white">
                {" "}
              </InboxArrowDownIcon>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
