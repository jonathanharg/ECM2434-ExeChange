import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Product } from "../Marketplace/Itemtile";
import DayPick from "./DayPick";
import { TradeInvolvement } from "./TradeCenter";

export default function TradeResponse(trade: TradeInvolvement) {
  const [page, setPage] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [reciever_exchanging, setRecieverExchanging] = useState<Number[]>([]);

  function fetchProducts() {
    return fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  function handleclick() {
    console.log(reciever_exchanging);
    setPage((page) => page + 1);
  }

  function handleBack() {
    setPage((page) => page - 1);
  }

  function handleExtraItems(index) {
    if (reciever_exchanging.includes(index)) {
      setRecieverExchanging(reciever_exchanging.filter((i) => i !== index));
    } else {
      setRecieverExchanging([...reciever_exchanging, index]);
    }
  }

  function showSvg(index) {
    if (reciever_exchanging.includes(index)) {
      return (
        <CheckCircleIcon
          className={`absolute right-0 h-6 w-6 stroke-green-800`}
        >
          {" "}
        </CheckCircleIcon>
      );
    }
  }

  return (
    <div className="w-full">
      <div
        className={
          page == 0
            ? "flex flex-col items-center overflow-hidden rounded-lg p-4"
            : "hidden"
        }
      >
        {trade.giver_giving.length == 1 ? (
          <>
            <h3 className="p-5 text-xl font-bold text-gray-900">
              {" "}
              Request for: {trade.giver_giving.map((i) => i.caption)}{" "}
            </h3>
            <div className="flex w-full justify-center p-2">
              {trade.giver_giving.map((i) => (
                <div
                  key={i.id}
                  className="relative w-1/4 overflow-hidden rounded-lg font-bold text-gray-900 hover:opacity-75"
                >
                  <img draggable={false} tabIndex={1} src={i.image} />
                </div>
              ))}
            </div>
            <p className="pt-2 text-sm text-gray-500">
              <b> Message from {trade.receiver.username}: </b> {trade.message}
            </p>
          </>
        ) : (
          <>
            <h3 className="p-5 text-xl font-bold text-gray-900">
              {" "}
              Items requested{" "}
            </h3>
            <div className="container mx-auto grid grid-flow-dense grid-cols-4 gap-2 overflow-hidden rounded-md p-4 py-1">
              {trade.giver_giving.map((i) => (
                <div
                  key={i.id}
                  className="relative w-full overflow-hidden rounded-lg text-sm font-bold text-gray-900 hover:opacity-75"
                >
                  <img draggable={false} tabIndex={1} src={i.image} />
                </div>
              ))}
            </div>
            <p className="pt-2 text-sm text-gray-500">
              <b> Message from {trade.receiver.username}: </b> {trade.message}
            </p>
          </>
        )}
        <div className="flex items-center justify-center p-2">
          <button
            onClick={handleclick}
            className="flex w-fit items-center rounded-lg border border-gray-300 bg-stone-900 p-2.5 text-sm font-medium text-white hover:bg-stone-700 hover:text-gray-50"
          >
            Pick the items you would like in exechange
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
        {products.filter((i) => i.owner.id == trade.receiver.id).length > 0 ? (
          products.filter((i) => i.owner.id == trade.receiver.id).length ==
          1 ? (
            <>
              <h3 className="pt-5 pb-2 text-xl font-bold text-gray-900">
                {" "}
                {trade.receiver.username} has...{" "}
              </h3>
              <p className="text-sm text-gray-500">
                <b> Click </b> to select
              </p>
              <div className="flex w-full justify-center p-2">
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
                You <b> don't need </b> to pick an item to continue
              </p>
            </>
          ) : (
            <>
              <h3 className="pt-5 pb-1 text-xl font-bold text-gray-900">
                {" "}
                {trade.receiver.username} has...{" "}
              </h3>
              <p className="text-sm text-gray-500">
                <b> Click </b> to select
              </p>
              <div className="container mx-auto grid grid-flow-dense grid-cols-4 gap-2 overflow-hidden rounded-md p-4 py-1">
                {products
                  .filter((i) => i.owner.id == trade.receiver.id)
                  .map((i) => (
                    <div
                      key={i.id}
                      className="relative w-full overflow-hidden rounded-md bg-gray-200 hover:opacity-75"
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
                You <b> don't need </b> to pick an item to continue
              </p>
            </>
          )
        ) : (
          <>
            <div className="flex items-center justify-center">
              <h3 className="text-md font-bold text-gray-900">
                {" "}
                Looks like {trade.receiver.username} hasn't posted any items
                yet!{" "}
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
          <div className="justify-right ml-8">
            <button
              onClick={handleclick}
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
        <h3 className="pt-5 text-xl font-bold text-gray-900">
          Pick the day you'd like to trade.
        </h3>
        <DayPick />
        <p className="text-sm text-gray-500">
          You can only schedule a trade within a <b> week's </b> time.
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
          <div className="justify-right ml-8">
            <button
              onClick={handleclick}
              className="flex w-fit items-center  rounded-lg border  border-gray-300 bg-stone-900 p-2 pl-6 text-sm font-medium text-white hover:bg-stone-700 hover:text-gray-50"
            >
              Next
              <ArrowRightIcon className="m-2 h-3 w-3 stroke-2"></ArrowRightIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
