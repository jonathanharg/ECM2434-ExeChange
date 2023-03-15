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
import TradeAccept from "./TradeViews/AcceptGiverView";
import GiverAcceptView from "./TradeViews/AcceptGiverView";
import ReceiverAcceptView from "./TradeViews/AcceptReceiverView";
import { tr } from "date-fns/locale";
import PendingTradeView from "./TradeViews/PendingGiverTradeView";
import PendingGiverTradeView from "./TradeViews/PendingGiverTradeView";
import PendingReceiverTradeView from "./TradeViews/PendingReceiverTradeView";
import AcceptReceiverView from "./TradeViews/AcceptReceiverView";
import AcceptGiverView from "./TradeViews/AcceptGiverView";

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
           <PendingGiverTradeView {...trade} /> 
            )
        : trade.status == "A" ? (
            <AcceptGiverView {...trade}/>
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
        <PendingReceiverTradeView {...trade}/> 
        ) : trade.status == "A"? (
            <AcceptReceiverView {...trade}/>
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
