import React, { useEffect, useState } from "react";

import { TradeInvolvement } from "./TradeCentre";
import TradeView from "./TradeView";

export type ProfileData = {
  username:string;
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
          className="mx-auto my-2 w-full max-w-md rounded-2xl bg-white"
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
