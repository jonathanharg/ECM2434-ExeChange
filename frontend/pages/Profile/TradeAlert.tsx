import axios from "axios";
import React, { useState } from "react";

export type Trade = {
  id: number;
  initiator: string;
  location: string;
  time: string;
  date: string;
  itemId: string;
};

function TradeAlert(trade: Trade) {
  const [tradeState, setTradeState] = useState<boolean>(false);

  function postToTrade(apiPath: string) {
    const itemId = trade.itemId;
    const date = trade.date;
    const location = trade.location;
    const time = trade.time;
    const initiator = trade.initiator;
    axios
      .post(
        apiPath,
        JSON.stringify({ itemId, date, location, time, initiator }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.status == "OK") {
          setTradeState(response.data.pending_status);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // useEffect(() => {
  //   postToTrade("/api/getpendingtradestatus");
  // }, []);

  return (
    <div
      id="alert-border-3"
      className={
        tradeState
          ? "light:text-blue-500 light:bg-gray-800 light:border-blue-500 mb-4 flex border-4 border-green-500 bg-white p-4 text-green-500"
          : "light:text-blue-500 light:bg-gray-800 light:border-blue-500 mb-4 flex border-4 border-blue-500 bg-white p-4 text-blue-500"
      }
      role="alert"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
        />
      </svg>
      <div className="ml-3 text-sm font-medium">
        Trade Alert! User {trade.initiator} would like [item id: {trade.itemId}]
        to trade at {trade.location} on {trade.date} at {trade.time} !
      </div>
      <button
        type="button"
        className="-mx-4.0 w-23 light:bg-gray-800 light:text-green-400 light:hover:bg-gray-700 -my-1.5 ml-auto inline-flex h-8 rounded-lg bg-white p-1.5 text-black hover:bg-white focus:ring-2 focus:ring-black"
        data-dismiss-target="#alert-border-3"
        aria-label="Close"
        onClick={() => {
          postToTrade("/api/confirmpendingtrade");
        }}
      >
        <div className="ml-1 text-sm font-medium">Accept</div>
      </button>
      <button
        type="button"
        className="-mx-4.0 w-23 light:bg-gray-800 light:text-green-400 light:hover:bg-gray-700 -my-1.5 ml-auto inline-flex h-8 rounded-lg bg-white p-1.5 text-black hover:bg-white focus:ring-2 focus:ring-black"
        data-dismiss-target="#alert-border-3"
        aria-label="Close"
        onClick={() => {
          postToTrade("/api/removependingtrade");
        }}
      >
        <div className="ml-1 text-sm font-medium">Deny</div>
      </button>
      <button
        type="button"
        className="-mx-4.0 w-23 light:bg-gray-800 light:text-green-400 light:hover:bg-gray-700 -my-1.5 ml-auto inline-flex h-8 rounded-lg bg-white p-1.5 text-black hover:bg-white focus:ring-2 focus:ring-black"
        data-dismiss-target="#alert-border-3"
        aria-label="Close"
      >
        <div className="ml-1 text-sm font-medium">View</div>
      </button>
    </div>
  );
}

export default TradeAlert;
