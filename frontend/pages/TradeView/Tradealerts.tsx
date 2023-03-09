import { Console } from 'console';
import { setFips } from 'crypto';
import React, { useEffect, useState } from 'react';
import { Product } from '../Marketplace/Itemtile';


export type User = {
    id: number,
    username: String
}


export type TradeInvolvement = {
    id: number,
    giver: User,
    receiver: User,
    giver_giving: Product[],
    reciever_exchanging: Product[],
    message: String,
}

export default function TradeAlerts() {
    const [tradeInvolvements, setTradeInvolvements] = useState<TradeInvolvement[]>([]);

    function fetchInvolvement() {
        return fetch("/api/trade/all")
          .then((response) => response.json())
          .then((data) => setTradeInvolvements(data));
      }

    useEffect(()=> {
        fetchInvolvement()
    }, [])
   
    return (   
        <div className= "ml-3 text-sm font-medium">
            {tradeInvolvements.map((trade) => (trade.receiver.username))} is requesting your item 
            {tradeInvolvements.map((trade)=>(trade.giver_giving.map((i)=> i.caption)))} !!!
        </div>
    )

}