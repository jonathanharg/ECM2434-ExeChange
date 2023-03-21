import { Disclosure, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpIcon,
  ArrowPathIcon,
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  XMarkIcon,
  MapPinIcon,
  ClockIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { ProfileData } from "./TradeAlert";
import { TradeInvolvement } from "./TradeCentre";
import TradeResponse from "./TradeResponse";

interface TradeViewProps {
  trade: TradeInvolvement;
  profileData: ProfileData | undefined;
  acceptTrade: (id: number) => void;
}
export default function TradeView({ trade, profileData, acceptTrade }: TradeViewProps) {
  const Datetime = trade.time;
  const meetingTime = Datetime?.split("T")[1]?.replace(":00Z", "");
  const meetingDay = Datetime?.split("T")[0];
  const GiverPage = profileData?.name == trade.giver.username;
  const [isHere, setIsHere] = useState(false);
  const [code, setCode] = useState(0);
  const [inputcode, setInputCode] = useState("");
  
  async function handleArrived() {
    const apiPath = `/api/trade/${trade.id}/arrived`;
 
    await axios.get(apiPath)
      .then((response) => {
      if(response.data.status == "OK") {
          setIsHere(!isHere);
          console.log(isHere);
          if (profileData?.name == trade.receiver.username) {
            getCode();
          }

      }
      })
      .catch((error) => {
        console.log(error)
      })
        
      }

  async function getCode() {
    const apiPath = `/api/trade/${trade.id}/confirm`;
  
    await axios.get(apiPath)
      .then((response) => {
      if(response.data.status == "OK") {
          setCode(response.data.confirmation_code)
          console.log(response.data);
      }
      })
      .catch((error) => {
        console.log(error)
      })
        
      }
    
  
  async function handleSendConfirmationCode() {
    const apiPath = `/api/trade/${trade.id}/confirm`;
    const confirmation_code = parseInt(inputcode);
    await axios.post( apiPath,
      JSON.stringify({
        confirmation_code
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    ).then((response) => {
      // TODO: Handle more responses than just OK
      if (response.data.status == "OK") {
        console.log(response.data)
        
      } else {
        // TODO:
        return;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
  return (
    <div >
      {trade.status == "P" && (
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-3 text-left text-sm font-medium text-black shadow hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus-visible:ring-opacity-75">
              {GiverPage ? (
                <><ArrowDownRightIcon className="h-5 w-5 stroke-green-800 stroke-[3]"></ArrowDownRightIcon>
                <b>Incoming trade request from {trade.receiver.username} </b></>
                    ) : (
                      <><ArrowUpRightIcon className="h-5 w-5 stroke-green-800 stroke-[3]"></ArrowUpRightIcon>
                     <b>You sent a trade request to {trade.giver.username}! </b></>
                )}

                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 stroke-[3] text-green-800`}
                />
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
                <Disclosure.Panel
                  static
                  className="overflow-hidden rounded-md px-4 pt-4 pb-2 text-sm text-gray-500 shadow"
                >
                  {!GiverPage && (
                    <div className="flex w-full flex-col items-center justify-center">
                      {trade.giver_giving.length == 1 ? (
                        <>
                          <h3 className="text-xl font-bold text-gray-900">
                            You requested the {" "}
                            {trade.giver_giving.map((i) => i.caption)}
                          </h3>
                          <div className="flex w-full justify-center p-2">
                            {trade.giver_giving.map((i) => (
                              <div
                                key={i.id}
                                className="relative w-1/4 overflow-hidden rounded-lg font-bold text-gray-900 hover:opacity-75"
                              >
                                <img
                                  draggable={false}
                                  tabIndex={1}
                                  src={i.image}
                                />
                              </div>
                            ))}
                          </div>
                          <div
                            className={trade.message === "" ? "hidden" : " "}
                          >
                            <p className="pt-2 text-sm text-gray-500">
                              <b> You said: </b> {trade.message}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="text-xl font-bold text-gray-900">
                            You requested the following items:
                          </h3>
                          <div className="flex w-full justify-between p-2">
                            {trade.giver_giving.map((i) => (
                              <div
                                key={i.id}
                                className="relative w-1/4 overflow-hidden rounded-lg font-bold text-gray-900 hover:opacity-75"
                              >
                                <img
                                  draggable={false}
                                  tabIndex={1}
                                  src={i.image}
                                />
                              </div>
                            ))}
                          </div>
                          <div
                            className={trade.message === "" ? "hidden" : " "}
                          >
                            <p className="pt-2 text-sm text-gray-500">
                              <b> You said: </b> {trade.message}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {GiverPage && <TradeResponse trade = {trade} acceptTrade= {acceptTrade} />}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      )}

      {trade.status == "A" && (
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-green-700 px-4 py-3 text-left text-sm font-medium text-white shadow hover:bg-green-600 focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus-visible:ring-opacity-75">
                <CheckIcon className="h-5 w-5 stroke-white stroke-[3]"></CheckIcon>
                {profileData?.name == trade.giver.username && (
                  <span>
                    You accepted <b>{trade.receiver.username}&apos;s</b>{" "}
                    request!
                  </span>
                )}
                {profileData?.name == trade.receiver.username && (
                  <span>
                    <b> {trade.giver.username} </b> accepted your trade request!
                  </span>
                )}
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 stroke-[3] text-green-800`}
                />
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
                <Disclosure.Panel
                  static
                  className="overflow-hidden rounded-md px-4 pt-4 pb-2 text-sm text-gray-500 shadow"
                >
                  <div className="flex w-full flex-col items-center justify-center">
                            <div className="grid grid-rows-2 grid-cols-3 w-full text-center justify-center"> 
                            <div className="flex justify-center"><MapPinIcon className="m-2 h-5 stroke-green-800 stroke-2 w-5"></MapPinIcon> </div>
                            <div className="flex justify-center"> <ClockIcon className="m-2 h-5 stroke-green-800 stroke-2 w-5"></ClockIcon></div>
                            <div className="flex justify-center"><CalendarDaysIcon  className="m-2 h-5 stroke-green-800 stroke-2 w-5"></CalendarDaysIcon> </div>
                          
                            <p className="text-xl text-gray-600"> <b> {trade.location.name} </b> </p> 
          
                            <p className="text-xl text-gray-600"> <b> {meetingTime}</b> </p> 

                            <p className="text-xl text-gray-600"> <b> {meetingDay}</b> </p> 
                            </div> 

                            <p className={trade.receiver_exchanging.length == 0 ? " ": "hidden"}> You're <b> giving away </b> this item. </p>
                            <div
                              className={
                                trade.giver_giving.length == 1
                                  ? "flex w-full justify-center p-2"
                                  : "flex w-full justify-between p-2"
                              }
                            >
                              {trade.giver_giving.map((i) => (
                                <div
                                  key={i.id}
                                  className="relative w-1/4 overflow-hidden rounded-lg font-bold text-gray-900 hover:opacity-75"
                                >
                                  <img
                                    draggable={false}
                                    tabIndex={1}
                                    src={i.image}
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-center">
                              <ArrowPathIcon className="h-10 w-10 stroke-[3] text-green-800"></ArrowPathIcon>
                            </div>
                            <div
                              className={
                                trade.receiver_exchanging.length == 1
                                  ? "flex w-full justify-center p-2"
                                  : "flex w-full justify-between p-2"
                              }
                            >
                              {trade.receiver_exchanging.map((i) => (
                                <div
                                  key={i.id}
                                  className="relative w-1/4 overflow-hidden rounded-lg font-bold text-gray-900 hover:opacity-75"
                                >
                                  <img
                                    draggable={false}
                                    tabIndex={1}
                                    src={i.image}
                                  />
                                </div>
                              ))}
                    </div>
                 
                    
              <div className="p-2"> 
              {!isHere ? (
                <><button
                          onClick={() => handleArrived()}
                          className="flex w-fit items-center rounded-lg border border-gray-300 bg-stone-900 p-2.5 text-sm font-medium text-white hover:bg-stone-700 hover:text-gray-50"
                        >
                            I'm Here!
                          </button></>) : (isHere && profileData?.name == trade.giver.username) ? (
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                     <b> Enter the confirmation code: </b>
                    </label>
                    <input onChange= {(e) => setInputCode(e.target.value)}className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
                    <button
                    onClick={() => handleSendConfirmationCode()}
                    className="flex w-fit items-center rounded-lg border border-gray-300 bg-stone-900 p-2.5 text-sm font-medium text-white hover:bg-stone-700 hover:text-gray-50"
                    >
                    Send
                    </button>
                  </div>
                ):(isHere && profileData?.name == trade.receiver.username) && (
                  <p className="pt-2 text-sm text-gray-500"> 
                  The confirmation code is {code}
                  </p> 
                )}
              
              </div>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      )}
      {trade.status == "R" && (
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-red-800 px-4 py-3 text-left text-sm font-medium text-white shadow hover:bg-red-600 focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus-visible:ring-opacity-75">
                <XMarkIcon className="h-5 w-5 stroke-white stroke-[3]"></XMarkIcon>
                {GiverPage ? (
                  <span>
                    <b>
                      You rejected {trade.receiver.username}&apos;s request!
                    </b>
                  </span>
                ) : (
                  <span>
                    <b>{trade.giver.username} rejected your request :</b>
                  </span>
                )}
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 stroke-[3] text-green-800`}
                />
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
                <Disclosure.Panel
                  static
                  className="overflow-hidden rounded-md px-4 pt-4 pb-2 text-sm text-gray-500 shadow"
                ></Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      )}
    </div>
  );
}
