import React, { useEffect, useState } from "react";
import { Product } from "../Marketplace/Itemtile";
import Tradealerts from "./Tradealerts";

export type User = {
  id: number;
  username: String;
};

export type TradeInvolvement = {
  id: number;
  giver: User;
  receiver: User;
  giver_giving: Product[];
  reciever_exchanging: Product[];
  message: String;
};

export default function TradeCenter() {
  const [trades, setTrades] = useState<TradeInvolvement[]>([]);

  function fetchInvolvement() {
    return fetch("/api/trade/all")
      .then((response) => response.json())
      .then((data) => setTrades(data));
  }
  useEffect(() => {
    fetchInvolvement();
  }, []);

  return (
    <div className="w flex flex-col px-4 pt-12">
      <h2 className="pb-5 text-left text-2xl font-bold">Trades</h2>
      {trades.map((trade) => (
        <Tradealerts key={trade.id} {...trade} />
      ))}
    </div>
  );
}
