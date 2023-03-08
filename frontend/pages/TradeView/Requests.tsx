import React, { useEffect, useState } from 'react';
import Tradealert, { Trade } from '../../components/Tradealert';


export default function Requests() {
    const [trades, setTrades] = useState<Trade[]>([]);
    function fetchTrades() {
        return fetch("/api/pendingtrades")
          .then((response) => response.json())
          .then((data) => setTrades(data));
      }


    useEffect(() => {
        fetchTrades();
      }, []);

    
    return ( 
        <div className="flex w-max flex-col px-4 pt-12">
            {trades.map((trade) => (
            <Tradealert key={trade.id} {...trade} />
            ))}
        </div>
    )
}