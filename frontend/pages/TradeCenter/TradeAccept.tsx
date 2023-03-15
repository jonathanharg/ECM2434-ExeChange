import { Disclosure, Transition } from '@headlessui/react';
import { ArrowPathIcon, ArrowUpRightIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Product } from '../Marketplace/Itemtile';
import { User } from './TradeCenter';

type TradeInfo = {
    receiver: User;
    receiver_exchanging: Product[];
    giver_giving: Product[];
    time: string;
    location: string;
  }

export default function TradeAccept() {
    const [tradeInfo, setTradeInfo] = useState<TradeInfo>();
    console.log(tradeInfo)

    async function fetchInfo() {
        await axios("api/trade/all").then((response) => setTradeInfo(response.data));
    }
    useEffect(() => {
        fetchInfo()
      }, []);

return (
    <Disclosure>
        {({ open }) => (
        <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-green-700 shadow px-4 py-3 text-left text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus-visible:ring-opacity-75">
            <ArrowUpRightIcon className="h-5 w-5 stroke-white stroke-[3]">
            </ArrowUpRightIcon>
            <span> <b>  You accepted {tradeInfo?.receiver?.username}'s request! </b> </span>
            <ChevronUpIcon
                className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-green-800 stroke-[3]`} />
            </Disclosure.Button>
        <Transition
                show={open}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
            <Disclosure.Panel static className="px-4 pt-4 pb-2 text-sm text-gray-500 shadow rounded-md overflow-hidden"> 
                  <div className="w-full flex flex-col justify-center items-center">
                    You're trading 
                    <div className="flex w-full justify-center p-2">
                      {tradeInfo?.giver_giving?.map((i) => (
                        <div
                          key={i.id}
                          className="relative w-1/4 overflow-hidden rounded-lg font-bold text-gray-900 hover:opacity-75"
                        >
                          <img draggable={false} tabIndex={1} src={i.image} />
                        </div>
                      ))}
                    </div>
                    <ArrowPathIcon className='h-12 w-12 text-green-800 stroke-[3]'></ArrowPathIcon>
                    for 
                    <div className={tradeInfo?.receiver_exchanging?.length != 0 ? "flex w-full justify-center p-2": "hidden"}>
                      {tradeInfo?.receiver_exchanging?.map((i) => (
                        <div
                          key={i.id}
                          className="relative w-1/4 overflow-hidden rounded-lg font-bold text-gray-900 hover:opacity-75"
                        >
                          <img draggable={false} tabIndex={1} src={i.image} />
                        </div>
                      ))}
                    </div>
    
                </div>  
            </Disclosure.Panel>
        </Transition>
            </>
          )}
    </Disclosure>
    )
}