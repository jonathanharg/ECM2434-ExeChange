import React, { useEffect, useState } from "react";
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

  return (
    <div className="w flex flex-col px-4 pt-12">
      <h2 className="pb-5 text-center text-2xl font-bold">Trades</h2>
      {trades.map((trade) => (
        <TradeAlert key={trade.id} rejectTrade={rejectTrade} trade={trade} />
      ))}
    </div>
  );
}
