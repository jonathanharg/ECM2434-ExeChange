import {
  ArrowDownLeftIcon,
  ArrowDownRightIcon,
  ArrowRightCircleIcon,
  ArrowUpRightIcon,
  CheckBadgeIcon,
  CheckIcon,
  InboxArrowDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import React, {useEffect, useState } from "react";

import { TradeInvolvement, User } from "./TradeCenter";
import {Transition, Disclosure } from "@headlessui/react";
import TradeResponse from "./TradeResponse";
import { usePopper } from "react-popper";
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Product } from "../Marketplace/Itemtile";
import TradeAccept from "./GiverAcceptView";
import GiverAcceptView from "./GiverAcceptView";
import ReceiverAcceptView from "./ReceiverAcceptView";
import { tr } from "date-fns/locale";
import PendingTradeView from "./PendingTradeView";

export type ProfileData = {
  levelPercent: number;
  name: string;
  level: number;
};


export default function TradeAlerts(trade: TradeInvolvement) {
  const [profileData, setProfileData] = useState<ProfileData>();
  const [isShowing, setIsShowing] = useState(false);
  
  function fetchProfileData() {
    return fetch("/api/profiledata")
      .then((response) => response.json())
      .then((data) => 
      setProfileData(data));
  }


  useEffect(() => {

    fetchProfileData();
  }, []);
  return (
    <div className="w-full px-4">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2"> 
      {trade.receiver.username != profileData?.name ? (
        // view of original giver, i.e person getting the request 
      <div>
        {trade.status == "P" ? (
           <PendingTradeView {...trade} /> 
            )
        : trade.status == "A" ? (
            <GiverAcceptView {...trade}/>
        ) : (
          <Disclosure>

          </Disclosure>
        )
      }
      </div>
      ) : (
        // view of original receiver, i.e person sending the request
      <div>
      {trade.status == "P" ? (
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button onClick={() => setIsShowing((isShowing) => !isShowing)} className="flex w-full justify-between rounded-lg bg-white shadow px-4 py-3 text-left text-sm font-medium text-black hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus-visible:ring-opacity-75">
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
                show={isShowing}
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
        ) : trade.status == "A"? (
            <ReceiverAcceptView {...trade}/>
        ) : (
          <Disclosure></Disclosure>
        )
      }
      </div>)
      }
      </div> 
    </div>
  )
}
