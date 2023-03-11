import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

import { TradeInvolvement } from "./TradeCenter";

export default function TradeResponse(trade: TradeInvolvement) {
    const [page, setPage] = useState<number>(0)

    function handleclick() {
        setPage(1)
    }
    return (
        <div className="w-full"> 
            <div className="p-4 overflow-hidden flex flex-col items-center rounded-lg">
                {trade.giver_giving.length == 1 ? 
                  <>
                    <h3 className="text-xl font-bold text-gray-900">
                    {" "}
                    {trade.receiver.username} wants the {trade.giver_giving.map((i) => i.caption)}{" "}
                    </h3> 
                    <div className="flex justify-center w-full p-2"> 
                    {trade.giver_giving.map((i) =>  
                    <div key= {i.id} className="w-1/4 font-bold text-gray-900 relative overflow-hidden rounded-lg hover:opacity-75">
                    <img
                    draggable={false}
                    tabIndex={1}
                    src={i.image}
                    />
                    </div>)

                    }   
                    </div>
                    <p className="text-sm pt-2 text-gray-500">   
                        <b> Message from {trade.receiver.username}: </b> {trade.message}  
                    </p> 
                </>
                : 
                <>
                    <h3 className="text-xl font-bold text-gray-900">
                    {" "}
                    {trade.receiver.username} wants the following items: {" "}
                    </h3>
                    <div className="p-4 container grid grid-flow-dense grid-cols-4 gap-2 rounded-md overflow-hidden mx-auto py-1"> 
                        {trade.giver_giving.map((i) =>  
                        <div key= {i.id} className="w-full text-sm font-bold text-gray-900 relative overflow-hidden rounded-lg hover:opacity-75">
                        <img
                        draggable={false}
                        tabIndex={1}
                        src={i.image}
                        />
                        </div>)}   
                    </div>
                    <p className="text-sm pt-2 text-gray-500">   
                        <b> Message from {trade.receiver.username}: </b> {trade.message}  
                    </p> 
                </>
                }  
                </div>
                <div className="pb-4 flex justify-center items-center">
                    <button onClick ={()=> handleclick} className="w-fit flex items-center p-2 text-sm font-medium text-white bg-green-800 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                        Pick the Items you would like in exechange 
                        <ArrowRightIcon className="h-3 w-3"></ArrowRightIcon>
                    </button>
            </div>
        </div>  
    )
}