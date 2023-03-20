import { Disclosure, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpIcon,
  ArrowPathIcon,
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  XMarkIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { ProfileData } from "./TradeAlert";
import { TradeInvolvement } from "./TradeCentre";
import TradeResponse from "./TradeResponse";

interface TradeAndProfileType {
  trade: TradeInvolvement;
  profileData: ProfileData | undefined;
}

export default function TradeView({ trade, profileData }: TradeAndProfileType) {
  const Datetime = trade.time;
  const meetingTime = Datetime?.split("T")[1]?.replace(":00Z", "");
  const meetingDay = Datetime?.split("T")[0];
  const GiverPage = profileData?.name == trade.giver.username;

  return (
    <div>
      {trade.status == "P" && (
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-3 text-left text-sm font-medium text-black shadow hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus-visible:ring-opacity-75">
                <ArrowDownRightIcon className="h-5 w-5 stroke-green-800 stroke-[3]"></ArrowDownRightIcon>
                <span>
                  <b>
                    {GiverPage ? (
                      <>Incoming trade request from {trade.receiver.username}</>
                    ) : (
                      <>You sent a trade request to {trade.giver.username}!</>
                    )}
                  </b>
                </span>

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
                            You requested the
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

                  {GiverPage && <TradeResponse {...trade} />}
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
                    {profileData?.name == trade.giver.username && (
                      <div>
                        {trade.receiver_exchanging.length == 0 ? (
                          <div>
                            You&apos;re giving away{" "}
                            {trade.giver_giving.length == 1
                              ? "this item"
                              : "these items"}{" "}
                            to <b>{trade.receiver.username}</b> at{" "}
                            <b>{meetingTime}</b> at{" "}
                            <b> {trade.location.name}</b> on{" "}
                            <b>{meetingDay} </b>
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
                          </div>
                        ) : (
                          <div>
                            You&apos;re trading these items with{" "}
                            <b>{trade.receiver.username}</b> at{" "}
                            <b>{meetingTime}</b> at{" "}
                            <b> {trade.location.name}</b> on{" "}
                            <b>{meetingDay} </b>
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
                          </div>
                        )}
                      </div>
                    )}
                    {profileData?.name == trade.receiver.username && (
                      <div>
                        {trade.receiver_exchanging.length == 0 ? (
                          <div>
                            {trade.giver.username} is giving these items to you
                            at <b>{meetingTime}</b> at{" "}
                            <b> {trade.location.name}</b> on{" "}
                            <b>{meetingDay} </b>
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
                          </div>
                        ) : (
                          <div>
                            <b>{trade.giver.username}</b> wants these items from
                            you at <b>{meetingTime}</b> at{" "}
                            <b> {trade.location.name}</b> on{" "}
                            <b>{meetingDay} </b>
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
                            <div className="flex justify-center">
                              <ArrowPathIcon className="h-10 w-10 stroke-[3] text-green-800"></ArrowPathIcon>
                            </div>
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
                          </div>
                        )}
                      </div>
                    )}
          <button
            // onClick={handleClick}
            className="flex w-fit items-center rounded-lg border border-gray-300 bg-stone-900 p-2.5 text-sm font-medium text-white hover:bg-stone-700 hover:text-gray-50"
          >
            I'm Here!
            <MapPinIcon className=" m-2 h-3 w-3"></MapPinIcon>
          </button>
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
