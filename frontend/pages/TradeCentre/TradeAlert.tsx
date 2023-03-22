import { TrashIcon } from "@heroicons/react/24/outline";

import React, { isValidElement, useEffect, useState } from "react";

import { TradeInvolvement } from "./TradeCentre";
import axios from "axios";
import TradeView from "./TradeView";
import { allowedNodeEnvironmentFlags } from "process";

export type ProfileData = {
  levelPercent: number;
  name: string;
  level: number;
};

interface TradeAlertProps {
  trade: TradeInvolvement;
  rejectTrade: (id: number) => void;
  acceptTrade: (id: number) => void;
}

export default function TradeAlert({
  trade,
  rejectTrade,
  acceptTrade,
}: TradeAlertProps) {
  const [profileData, setProfileData] = useState<ProfileData>();

  function fetchProfileData() {
    return fetch("/api/profiledata")
      .then((response) => response.json())
      .then((data) => setProfileData(data));
  }

  useEffect(() => {
    fetchProfileData();
  }, []);
  return (
    <div className="w-full">
      <div className="flex flex-row justify-center">
        <div
          id="tradeAlert"
          className="mx-auto w-full max-w-md rounded-2xl bg-white my-2"
        >
          <TradeView
            trade={trade}
            profileData={profileData}
            acceptTrade={acceptTrade}
            rejectTrade={rejectTrade}
          />
        </div>
      </div>
    </div>
  );
}
