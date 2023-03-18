import { TrashIcon } from "@heroicons/react/24/outline";

import React, { useEffect, useState } from "react";

import { TradeInvolvement } from "./TradeCentre";
import axios from "axios";
import TradeView from "./TradeView";

export type ProfileData = {
  levelPercent: number;
  name: string;
  level: number;
};

interface TradeAlertProps {
  trade: TradeInvolvement;
  rejectTrade: (id: number) => void;
}

export default function TradeAlert({ trade, rejectTrade }: TradeAlertProps) {
  const [profileData, setProfileData] = useState<ProfileData>();

  function fetchProfileData() {
    return fetch("/api/profiledata")
      .then((response) => response.json())
      .then((data) => setProfileData(data));
  }

  async function declineRequest() {
    const apiPath = `/api/trade/${trade.id}/reject`;
    await axios
      .post(
        apiPath,
        JSON.stringify({
          reject: true,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        // TODO: Handle more responses than just OK
        if (response.data.status != "OK") {
          rejectTrade(trade.id);
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
          <TradeView trade={trade} profileData={profileData} />
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
