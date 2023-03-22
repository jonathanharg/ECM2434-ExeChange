import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Product } from "../Marketplace/Itemtile";
import DayPick from "./DayPick";
import { TradeInvolvement } from "./TradeCentre";
import axios from "axios";
import TimeLocation from "./TimeLocation";

interface TradeResponseProps {
  trade: TradeInvolvement;
  acceptTrade: (id: number) => void;
}

export default function TradeResponse({
  trade,
  acceptTrade,
}: TradeResponseProps) {
  const [page, setPage] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [receiver_exchanging, setReceiverExchanging] = useState<number[]>([]);
  const [timePicked, setTimePicked] = useState("9:30");
  const [location, setLocation] = useState("Lafrowda");
  const [time, setTime] = useState<Date>();
  const [err, setErrmsg] = useState<string>();
  const [showError, setShowError] = useState(false);
  // this "time" above includes date and time, had to call it time instead of date cus that is how its defined in backend

  function fetchProducts() {
    return fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleClick() {
    console.log(receiver_exchanging);
    setPage((page) => page + 1);
  }

  function handleBack() {
    setPage((page) => page - 1);
  }

  function handleExtraItems(index: number) {
    if (receiver_exchanging.includes(index)) {
      setReceiverExchanging(receiver_exchanging.filter((i) => i !== index));
    } else {
      setReceiverExchanging([...receiver_exchanging, index]);
    }
  }

  function showSvg(index: number) {
    if (receiver_exchanging.includes(index)) {
      return (
        <CheckCircleIcon
          className={`absolute right-0 h-6 w-6 fill-green-800 stroke-white stroke-[1.5]`}
        >
          {" "}
        </CheckCircleIcon>
      );
    }
  }

  async function submitResponse() {
    const apiPath = `/api/trade/${trade.id}/accept`;
    console.log(timePicked);
    const hourMin = timePicked.split(":");
    time?.setHours(parseInt(hourMin[0] || ""), parseInt(hourMin[1] || ""));
    console.log(time);

    await axios
      .post(
        apiPath,
        JSON.stringify({
          receiver_exchanging,
          time,
          location,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        // TODO: Handle more responses than just OK

        if (response.data.status == "OK") {
          acceptTrade(trade.id);
          return;
        }
      })
      .catch((error) => {
        setShowError(true);
        setErrmsg(error.response.data.message);
      });
  }

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <div
          className={
            page == 0
              ? "flex w-full flex-col items-center justify-center"
              : "hidden"
          }
        >
          <h3 className="text-xl font-bold text-gray-900">
            {" "}
            {trade.giver_giving.length == 1
              ? `Request for ${trade.giver_giving.map((i) => i.caption)}`
              : "items requested"}
          </h3>
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
                <img draggable={false} tabIndex={1} src={i.image} />
              </div>
            ))}
          </div>
          <div className={trade.message === "" ? "hidden" : " "}>
            <p className="pt-2 text-sm text-gray-500">
              <b> Message from {trade.receiver.username}: </b> {trade.message}
            </p>
          </div>
          <div className="flex items-center justify-center p-2 mt-4">
            <button
              onClick={handleClick}
              className="flex w-fit items-center rounded-lg pl-5 border border-gray-300 bg-stone-900 p-2.5 text-sm font-medium text-white hover:bg-stone-700 hover:text-gray-50"
            >
              Continue with ExeChange
              <ArrowRightIcon className=" m-2 h-3 w-3"></ArrowRightIcon>
            </button>
          </div>
        </div>
        <div
          className={
            page == 1
              ? "flex flex-col items-center overflow-hidden rounded-lg p-4"
              : "hidden"
          }
        >
          {/* TODO: filter by backend instead  */}
          {products.filter((i) => i.owner.id == trade.receiver.id).length >
          0 ? (
            <>
              <h3 className="pb-2 text-xl font-bold text-gray-900">
                {" "}
                {trade.receiver.username} has...{" "}
              </h3>
              <p className="text-sm text-gray-500">
                <b> Click </b> to select
              </p>
              <div className="flex w-full justify-between p-2">
                {products
                  .filter((i) => i.owner.id == trade.receiver.id)
                  .map((i) => (
                    <div
                      key={i.id}
                      className="relative w-1/4 overflow-hidden rounded-md hover:opacity-75"
                    >
                      {showSvg(i.id)}
                      <img
                        draggable={false}
                        tabIndex={1}
                        src={i.image}
                        onClick={() => handleExtraItems(i.id)}
                      />
                    </div>
                  ))}
              </div>
              <p className="text-sm text-gray-500">
                You <b> don&apos;t need </b> to pick an item to continue
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center">
                <h3 className="text-md font-bold text-gray-900">
                  {" "}
                  Looks like {trade.receiver.username} hasn&apos;t posted any
                  items yet!{" "}
                </h3>
              </div>
              <p className="pt-2 text-sm text-gray-500">
                <b> psst... </b> You can still give away your item
              </p>
            </>
          )}

          <div className="grid w-full grid-cols-3 p-2 ">
            <div className="justify-left">
              <button
                onClick={handleBack}
                className="flex w-fit items-center rounded-lg border border-gray-300 bg-stone-900 p-2 pr-6 text-sm font-medium text-white hover:bg-stone-700 hover:text-gray-50"
              >
                <ArrowLeftIcon className=" m-2 h-3 w-3 stroke-2"></ArrowLeftIcon>
                Back
              </button>
            </div>
            <div className="justify-center"> </div>
            <div className="justify-right">
              <button
                onClick={handleClick}
                className="flex w-fit items-center rounded-lg border border-gray-300 bg-stone-900 p-2 pl-6 text-sm font-medium text-white hover:bg-stone-700 hover:text-gray-50"
              >
                Next
                <ArrowRightIcon className="m-2 h-3 w-3 stroke-2"></ArrowRightIcon>
              </button>
            </div>
          </div>
        </div>
        <div
          className={
            page == 2
              ? "flex flex-col items-center overflow-hidden rounded-lg p-4"
              : "hidden"
          }
        >
          <h3 className="text-xl font-bold text-gray-900">
            Pick the day you&apos;d like to trade.
          </h3>
          <DayPick day={time} setDay={setTime} />
          <p className="text-sm text-gray-500">
            You can only schedule a trade within a <b> week&apos;s </b> time.
          </p>
          <div className="grid w-full grid-cols-3 p-2 ">
            <div className="justify-left">
              <button
                onClick={handleBack}
                className="flex w-fit items-center rounded-lg border border-gray-300 bg-stone-900 p-2 pr-6 text-sm font-medium text-white hover:bg-stone-700 hover:text-gray-50"
              >
                <ArrowLeftIcon className=" m-2 h-3 w-3 stroke-2"></ArrowLeftIcon>
                Back
              </button>
            </div>
            <div className="justify-center"> </div>
            <div className="justify-right">
              <button
                onClick={handleClick}
                className="flex w-fit items-center  rounded-lg border  border-gray-300 bg-stone-900 p-2 pl-6 text-sm font-medium text-white hover:bg-stone-700 hover:text-gray-50"
              >
                Next
                <ArrowRightIcon className="m-2 h-3 w-3 stroke-2"></ArrowRightIcon>
              </button>
            </div>
          </div>
        </div>
        <div
          className={
            page == 3
              ? "flex h-full flex-col items-center overflow-visible rounded-lg p-4"
              : "hidden"
          }
        >
          <h3 className="text-xl font-bold text-gray-900">
            Pick the time and location you&apos;d like to trade at
          </h3>

          <TimeLocation
            selected={location}
            setSelected={setLocation}
            time={timePicked}
            setTime={setTimePicked}
          />

          <div className="grid w-full grid-cols-3 p-2 ">
            <div className="justify-left">
              <button
                onClick={handleBack}
                className="flex w-fit items-center rounded-lg border border-gray-300 bg-stone-900 p-2 pr-6 text-sm font-medium text-white hover:bg-stone-700 hover:text-gray-50"
              >
                <ArrowLeftIcon className=" m-2 h-3 w-3 stroke-2"></ArrowLeftIcon>
                Back
              </button>
            </div>
            <div className="justify-center"> </div>
            <div className="justify-right -ml-6 ">
              <button
                onClick={submitResponse}
                className="flex w-fit items-center  rounded-lg border  border-gray-300 bg-green-800 p-2 pl-6 text-sm font-medium text-white hover:bg-green-600 hover:text-gray-50"
              >
                ExeChange!
                <ArrowRightIcon className="m-2 h-3 w-3 stroke-2"></ArrowRightIcon>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="Error"
        className="relative rounded-md border-2 border-red-500 bg-red-200 p-4 md:max-w-md"
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
    </>
  );
}
