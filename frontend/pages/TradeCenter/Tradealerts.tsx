import { ArrowDownLeftIcon, ArrowDownRightIcon, ArrowRightCircleIcon, ArrowUpRightIcon, InboxArrowDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Console } from 'console';
import { setFips } from 'crypto';
import React, { useEffect, useState } from 'react';
import { Product } from '../Marketplace/Itemtile';
import { TradeInvolvement } from './TradeCenter';



type ProfileData = {
    levelPercent: number;
    name: string;
    level: number;
}

export default function TradeAlerts(trade: TradeInvolvement) {
    const [profileData, setProfileData] = useState<ProfileData>();

    function fetchProfileData() {
        return fetch("/api/profiledata")
          .then((response) => response.json())
          .then((data) => setProfileData(data));
      }

    useEffect(()=> {fetchProfileData()}, [])
    return (   
        // <div className="flex w-full flex-col px-4 pt-12">
        //     Incoming trade request from {" "}
        //     {trades.map((trade) => (
        //         trade.receiver.username
        //     ))} !!! 
        // </div>
    
        <div className="grid grid-cols-3 w-full items-center">
            <div className="justify-right"> 
                <h2 className="text-2xl font-bold pb-5 text-left">Trades</h2>

                    

                    { trade.receiver.username != profileData?.name ? 
                         /* Incoming trade toast  */
                    <div id="toast-default" className={"flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"} role="alert">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
                            <ArrowDownRightIcon className='stroke-2 stroke-green-800 h-5 w-5'> </ArrowDownRightIcon>
                        </div>
                        
                        <div className="ml-3 text-gray-900 text-sm font-bold"> Incoming trade request from {trade.receiver.username} !</div>
                        <div className="flex items-center ml-auto space-x-2"> 
                            <button type="button" className="bg-green-800 text-gray-600 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-green-700 inline-flex h-8 w-8">
                                    <InboxArrowDownIcon className="stroke-white h-5 w-5"> </InboxArrowDownIcon>
        
                            </button>
                        </div>
                    </div> :
                        
                            /* Outgoing trade toast  */
                    <div id="toast-default" className={"flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow"} role="alert">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
                            <ArrowUpRightIcon className='stroke-2 stroke-green-800 h-5 w-5'> </ArrowUpRightIcon>
                        </div>
                        
                        <div className="ml-3 text-gray-900 text-sm font-bold"> You sent a trade request to {trade.giver.username}!</div>
                        <div className="flex items-center ml-auto space-x-2"> 
                            <button type="button" className="bg-green-800 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-green-700 inline-flex h-8 w-8">
                                    <InboxArrowDownIcon className="stroke-white h-5 w-5"> </InboxArrowDownIcon>
        
                            </button>
                        </div>
                    </div>}
            </div>
            <div className="justify-center">

            </div>
        </div>
        
        
     
    );
}