import { TrashIcon } from "@heroicons/react/24/outline";

import React, { useEffect, useState } from "react";

import { TradeInvolvement } from "./TradeCenter";
import PendingGiverTradeView from "./TradeViews/PendingGiverTradeView";
import PendingReceiverTradeView from "./TradeViews/PendingReceiverTradeView";
import AcceptReceiverView from "./TradeViews/AcceptReceiverView";
import AcceptGiverView from "./TradeViews/AcceptGiverView";
import RejectedGiverTradeView from "./TradeViews/RejectedGiverTradeView";
import RejectedReceiverTradeView from "./TradeViews/RejectedReceiverTradeView";
import axios from "axios";

export type ProfileData = {
  levelPercent: number;
  name: string;
  level: number;
};

export default function TradeAlerts(trade: TradeInvolvement) {
  const [profileData, setProfileData] = useState<ProfileData>();
  const [rejected, setRejected] = useState(false);
  // const [status, setStatus] = useState("Pending")
  function fetchProfileData() {
    setRejected((p) => !p);
    return fetch("/api/profiledata")
      .then((response) => response.json())
      .then((data) => setProfileData(data));
  }

  async function declineRequest() {
    const tradeid = trade.id.toString();
    const apiPath = "/api/trade/" + tradeid + "/reject";
    setRejected(true);
    await axios
      .post(
        apiPath,
        JSON.stringify({
          reject: rejected,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        // TODO: Handle more responses than just OK
        if (response.data.status != "OK") {
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchProfileData();
  }, []);
  return (
    <div className="w-full px-4">
      <div className="flex flex-row justify-center">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
          {trade.receiver.username != profileData?.name ? (
            // view of original giver, i.e person getting the request
            <div>
              {trade.status == "P" ? (
                <PendingGiverTradeView {...trade} />
              ) : trade.status == "A" ? (
                <AcceptGiverView {...trade} />
              ) : (
                trade.status == "R" && <RejectedGiverTradeView {...trade} />
              )}
            </div>
          ) : (
            // view of original receiver, i.e person sending the request
            <div>
              {trade.status == "P" ? (
                <PendingReceiverTradeView {...trade} />
              ) : trade.status == "A" ? (
                <AcceptReceiverView {...trade} />
              ) : (
                trade.status == "R" && <RejectedReceiverTradeView {...trade} />
              )}
            </div>
          )}
        </div>
        <div className="pt-2">
          <button
            onClick={declineRequest}
            className="flex h-10 w-fit items-center rounded-lg border border-gray-300 bg-red-800 p-2 text-sm font-medium text-white hover:bg-red-700 hover:text-gray-50"
          >
            <TrashIcon className="h-5 w-5 stroke-white stroke-[3]"></TrashIcon>
          </button>
        </div>
      </div>
    </div>
  );
}
