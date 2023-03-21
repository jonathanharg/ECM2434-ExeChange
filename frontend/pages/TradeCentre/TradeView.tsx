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
  TrashIcon,
  MinusCircleIcon,
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
  rejectTrade: (id:number) => void;
}
export default function TradeView({
  trade,
  profileData,
  acceptTrade,
  rejectTrade
}: TradeViewProps) {
  const Datetime = trade.time;
  const meetingTime = Datetime?.split("T")[1]?.replace("Z", "");
  const meetingDay = Datetime?.split("T")[0]?.split("-")[2] + " / " + Datetime?.split("T")[0]?.split("-")[1]  ;
  const GiverPage = profileData?.name == trade.giver.username;
  const [isHere, setIsHere] = useState(false);
  const [code, setCode] = useState(0);
  const [inputcode, setInputCode] = useState("");
  const [err, setErrmsg] = useState<string>();
  const [showError, setShowError] = useState(false);

  async function handleArrived() {
    const apiPath = `/api/trade/${trade.id}/arrived`;

    await axios
      .get(apiPath)
      .then((response) => {
        if (response.data.status == "OK") {
          setIsHere(!isHere);
          console.log(isHere);
          if (profileData?.name == trade.receiver.username) {
            getCode();
          }
        }
      })
      .catch((error) => {
        setShowError(true);
        setErrmsg(error.response.data.message);
        console.log(error);
      });
  }

  async function getCode() {
    const apiPath = `/api/trade/${trade.id}/confirm`;

    await axios
      .get(apiPath)
      .then((response) => {
        if (response.data.status == "OK") {
          setCode(response.data.confirmation_code);
          console.log(response.data);
        }
      })
      .catch((error) => {
        setShowError(true);
        setErrmsg(error.response.data.message);
        console.log(error);
      });
  }
  async function declineRequest() {
    const apiPath = `/api/trade/${trade.id}/reject`;
    await axios
      .post(
        apiPath,
        JSON.stringify({
          reject: true,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        // TODO: Handle more responses than just OK
        if (response.data.status == "OK") {
          rejectTrade(trade.id);
        } else {
          // TODO:
          return;
        }
      })
      .catch((error) => {
        setShowError(true);
        setErrmsg(error.response.data.message);
        console.log(error);
      });
  }

  async function handleSendConfirmationCode() {
    const apiPath = `/api/trade/${trade.id}/confirm`;
    const confirmation_code = parseInt(inputcode);
    await axios
      .post(
        apiPath,
        JSON.stringify({
          confirmation_code,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        // TODO: Handle more responses than just OK
        if (response.data.status == "OK") {

          console.log(response.data);
        } else {
          // TODO:
          return;
        }
      })
      .catch((error) => {
        setShowError(true);
        setErrmsg(error.response.data.message); 
        console.log(error);
      });
  }
  return (
    <div>
      {trade.status == "P" && (
        <div className="relative h-auto w-full">
          <div className="absolute -right-2 -top-5 mb-5">
          <button
            onClick={declineRequest}
            className="" >
            <MinusCircleIcon className="m-auto h-8 w-8 fill-red-800 stroke-white stroke-[2]" />
          </button>
          </div>
     
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-3 text-left text-sm font-medium text-black shadow hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus-visible:ring-opacity-75">
                {GiverPage ? (
                  <>
                    <ArrowDownRightIcon className="h-5 w-5 stroke-green-800 stroke-[3]"></ArrowDownRightIcon>
                    <b>
                      Incoming trade request from {trade.receiver.username}{" "}
                    </b>
                  </>
                ) : (
                  <>
                    <ArrowUpRightIcon className="h-5 w-5 stroke-green-800 stroke-[3]"></ArrowUpRightIcon>
                    <b>You sent a trade request to {trade.giver.username}! </b>
                  </>
                )}

                <ChevronUpIcon
                  className={`${open ? "rotate-180 transform" : ""} h-5 w-5 stroke-[3] text-green-800`} />
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
                  className="overflow-visible rounded-md px-4 pt-4 pb-2 text-sm text-gray-500 shadow"
                >
                  {!GiverPage && (
                    <div className="flex w-full flex-col items-center justify-center">
                      <>
                        <h3 className="text-xl font-bold text-gray-900">

                          {trade.giver_giving.length == 1 ? `You requested the ${trade.giver_giving.map((i) => i.caption)}` : "You requested these items "}

                        </h3>
                        <div className={trade.giver_giving.length == 1 ? "flex w-full justify-center p-2" : "flex w-full justify-between p-2"}>
                          {trade.giver_giving.map((i) => (
                            <div
                              key={i.id}
                              className="relative w-1/4 overflow-hidden rounded-lg font-bold text-gray-900 hover:opacity-75"
                            >
                              <img
                                draggable={false}
                                tabIndex={1}
                                src={i.image} />
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
                    </div>
                  )}

                  {GiverPage && (
                    <TradeResponse trade={trade} acceptTrade={acceptTrade} />
                  )}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>  
     
      
      
    </div>
      )}

      {trade.status == "A" && (
        <><Disclosure>
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
                  className={`${open ? "rotate-180 transform" : ""} h-5 w-5 stroke-[3] text-green-800`} />
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
                    <div className="grid w-full grid-cols-3 grid-rows-2 justify-center text-center">
                      <div className="flex justify-center">
                        <MapPinIcon className="m-2 h-5 w-5 stroke-green-800 stroke-2"></MapPinIcon>{" "}
                      </div>
                      <div className="flex justify-center">
                        {" "}
                        <ClockIcon className="m-2 h-5 w-5 stroke-green-800 stroke-2"></ClockIcon>
                      </div>
                      <div className="flex justify-center">
                        <CalendarDaysIcon className="m-2 h-5 w-5 stroke-green-800 stroke-2"></CalendarDaysIcon>{" "}
                      </div>

                      <p className="text-xl text-gray-600">
                        {" "}
                        <b> {trade.location?.name} </b>{" "}
                      </p>

                      <p className="text-xl text-gray-600">
                        {" "}
                        <b> {meetingTime}</b>{" "}
                      </p>

                      <p className="text-xl text-gray-600">
                        {" "}
                        <b> {meetingDay}</b>{" "}
                      </p>
                    </div>

                    <div
                      className={trade.giver_giving.length == 1
                        ? "flex w-full justify-center p-2"
                        : "flex w-full justify-between p-2"}
                    >
                      {trade.giver_giving.map((i) => (
                        <div
                          key={i.id}
                          className="relative w-1/4 overflow-hidden rounded-lg font-bold text-gray-900 hover:opacity-75"
                        >
                          <img draggable={false} tabIndex={1} src={i.image} />
                        </div>
                      ))}
                    </div>
                    {trade.receiver_exchanging.length == 0 && profileData?.name == trade.giver.username ? (<p className="p-1">
                      {" "}
                      You're <b> giving away </b> this item.{" "}
                    </p>) : trade.receiver_exchanging.length == 0 && profileData?.name == trade.receiver.username ? (<p className="p-1">
                      {" "}
                      You're <b> getting </b> this item in return for nothing.{" "}
                    </p>) : (
                      <div className="flex justify-center">
                        <ArrowPathIcon className="h-10 w-10 stroke-[3] text-green-800"></ArrowPathIcon>
                      </div>)}

                    <div
                      className={trade.receiver_exchanging.length == 1
                        ? "flex w-full justify-center p-2"
                        : "flex w-full justify-between p-2"}
                    >
                      {trade.receiver_exchanging.map((i) => (
                        <div
                          key={i.id}
                          className="relative w-1/4 overflow-hidden rounded-lg font-bold text-gray-900 hover:opacity-75"
                        >
                          <img draggable={false} tabIndex={1} src={i.image} />
                        </div>
                      ))}
                    </div>

                    <div className="justify-center">
                      {!isHere ? (
                        <>
                          <button
                            onClick={() => handleArrived()}
                            className="flex w-fit items-center rounded-lg border border-gray-300 bg-stone-900 p-4 text-sm font-medium text-white hover:bg-stone-700 hover:text-gray-50"
                          >
                            I'm Here!
                          </button>
                        </>
                      ) : isHere &&
                        profileData?.name == trade.giver.username ? (
                        <div className="w-full">
                          <label
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                            htmlFor="grid-last-name"
                          >
                            <b> Enter the confirmation code: </b>
                          </label>
                          <input
                            onChange={(e) => setInputCode(e.target.value)}
                            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                            id="grid-last-name"
                            type="text"
                            placeholder="Doe" />
                            <div className="flex p-2 justify-center">
                          <button
                            onClick={() => handleSendConfirmationCode()}
                            className="flex w-fit items-center rounded-lg border border-gray-300 bg-stone-900 p-2.5 text-sm font-medium text-white hover:bg-stone-700 hover:text-gray-50"
                          >
                            Send
                          </button>
                          </div>
                        </div>
                      ) : (
                        isHere &&
                        profileData?.name == trade.receiver.username && code !== 0 ? (
                          <p className="pt-2 text-sm text-gray-500">
                            The confirmation code is {code}
                          </p>
                        ): isHere &&
                        profileData?.name == trade.receiver.username && code == 0 &&(
                          <p className="pt-2 text-sm text-gray-500">
                            The other trader isn't here yet! <b>Refresh</b> and <b> Try again</b> when they are. 
                          </p>
                        )
                      )}
                    </div>
                    <div
                      id="Error"
                      className="md:max-w-md relative rounded-md border-2 border-red-500 bg-red-200 p-4" 
                      hidden={!showError}
                    >
                      <div className="absolute right-2 top-2 align-top hover:cursor-pointer">
                        <div
                          onClick={() => {
                            setShowError(false);
                          }}
                          className=""
                        >
                          <XMarkIcon className="m-auto h-5 w-5 stroke-black stroke-2" />
                        </div>
                      </div>
                      <label className="font-bold">Uh oh</label>
                      <br />
                      <label>{err}</label>
                    </div>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
        <div className="p-2">
            <button
              onClick={declineRequest}
              className="flex h-10 w-fit items-center rounded-lg border border-gray-300 bg-red-800 p-2 text-sm font-medium text-white hover:bg-red-700 hover:text-gray-50"
            >
              <TrashIcon className="h-5 w-5 stroke-white stroke-[3]"></TrashIcon>
            </button>
          </div>
          </>
      )}
      {trade.status == "R" && (
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-red-800 px-4 py-3 text-left text-sm font-medium text-white shadow hover:bg-red-800 focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus-visible:ring-opacity-75">
                <XMarkIcon className="h-5 w-5 stroke-white stroke-[3]"></XMarkIcon>
                    <span>
                    <b>The request was deleted!</b>
                  </span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 stroke-[3] text-red-800`}
                />
              </Disclosure.Button>
            </>
          )}
        </Disclosure>
      )}
    </div>
  );
}
