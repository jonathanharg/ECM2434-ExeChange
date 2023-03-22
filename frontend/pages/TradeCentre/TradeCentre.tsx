import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../Marketplace/Itemtile";
import TradeAlert from "./TradeAlert";

export type User = {
  id: number;
  username: string;
};

type TradeLocation = {
  id: number;
  name: string;
};

export type TradeInvolvement = {
  id: number;
  status: string;
  giver: User;
  receiver: User;
  giver_giving: Product[];
  receiver_exchanging: Product[];
  message: string;
  time: string;
  location: TradeLocation;
};

export default function TradeCentre() {
  const [trades, setTrades] = useState<TradeInvolvement[]>([]);

  function fetchInvolvement() {
    return fetch("/api/trade/all")
      .then((response) => response.json())
      .then((data) => setTrades(data));
  }
  useEffect(() => {
    fetchInvolvement();
  }, []);

  function rejectTrade(id: number) {
    console.log("Function is executing");
    setTrades(
      trades.map((trade) =>
        trade.id === id ? { ...trade, status: "R" } : trade
      )
    );
  }
  function acceptTrade(id: number) {
    console.log("Function is executing");
    setTrades(
      trades.map((trade) =>
        trade.id === id ? { ...trade, status: "A" } : trade
      )
    );
  }

  return (
    <div className="w flex flex-col px-4 pt-6">
      <h2 className="pb-2 text-center text-2xl font-bold">Your Trades</h2>
      {trades.length > 0 ? (
        trades.map((trade) => (
          <TradeAlert
            key={trade.id}
            acceptTrade={acceptTrade}
            rejectTrade={rejectTrade}
            trade={trade}
          />
        ))
      ) : (
        <>
          <p className="mt-24 mb-2 text-center text-2xl font-bold text-gray-600">
            You&apos;ve got no trades
          </p>
          <p className="text-center text-lg text-gray-600">
            Head to the{" "}
            <Link to="/marketplace" className="font-bold">
              Marketplace
            </Link>{" "}
            and make some trades!
          </p>
        </>
      )}
    </div>
  );
}
