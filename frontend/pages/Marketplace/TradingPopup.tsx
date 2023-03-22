import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Product } from "./Itemtile";

interface ProfileData {
  levelPercent: number;
  name: string;
  level: number;
}

interface TradingProps {
  product: Product;
  setOpen: Dispatch<React.SetStateAction<boolean>>
}

export function Trading({product, setOpen}:TradingProps) {
  const [requestMessage, setRequestMessage] = useState("");
  const [profileData, setProfileData] = useState<ProfileData>();
  const [giver_giving, setGiverGiving] = useState<number[]>([product.id]); //items you're asking for. this item is default added in cause you've clicked on it
  const [products, setProducts] = useState<Product[]>([]);
  const [showError, setShowError] = useState(false);
  const [err, setErr] = useState<string>();
  const [success, setSuccess] = useState<string>();

  function fetchProducts() {
    const url = `/api/marketplace?user=${product.owner.id}`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProfileData() {
    return fetch("/api/profiledata")
      .then((response) => response.json())
      .then((data) => setProfileData(data));
  }

  useEffect(() => {
    fetchProfileData();
  }, []);

  function handleExtraItems(index: number) {
    if (giver_giving.includes(index)) {
      setGiverGiving(giver_giving.filter((i) => i !== index));
    } else {
      setGiverGiving([...giver_giving, index]);
    }
  }

  function showSvg(index: number) {
    if (giver_giving.includes(index)) {
      return (
        <CheckCircleIcon
          className={`absolute right-0 h-6 w-6 fill-green-800 stroke-white stroke-[1.5]`}
        >
          {" "}
        </CheckCircleIcon>
      );
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    // this function sends form data to /api/trade
    e.preventDefault();
    const giver = product.owner.id; // person you are asking for item from
    const message = requestMessage;
    await axios
      .post(
        "/api/trade/new",
        JSON.stringify({
          giver,
          giver_giving, //[] of itemIds
          message,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        // TODO: Handle more responses than just OK
        if (response.data.status == "OK") {
          setOpen(false);
          setRequestMessage(" ");
          return;
        }
      })
      .catch((error) => {
        setShowError(true);
        setErr(error.response.data.message);
      });
  };

  return (
    <div
      className={
        "grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8"
      }
    >
      <div className="overflow-hidden rounded-lg sm:col-span-4 lg:col-span-5">
        <div className="aspect-w-2 aspect-h-3 mt-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
          <img src={product.image} className=" object-cover object-center" />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-gray-900 sm:pr-12">
          {" "}
          {product.caption}{" "}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          <b>Tagged by {product.owner.username} as: </b>
          {product.tags.map((t) => t.value).join(", ")}
        </p>
        <p className="pt-1 text-sm text-gray-500">
          <b>Described as: </b> {product.description}
        </p>
      </div>
      <div className="sm:col-span-8 lg:col-span-7">
        <section aria-labelledby="options-heading">
          <div className="flex items-center justify-between px-4 pt-3">
            <UserCircleIcon className="h-16 w-16" />
            <div className="flex w-9/12 items-center">
              <div className="flex w-10/12 flex-col pl-4 leading-none">
                <p className="text-sm font-bold">{product.owner.username}</p>
                <p className="pt-1 text-sm font-light text-gray-800">
                  Level {profileData?.level}
                </p>
                <div className="mb-1 text-base font-medium text-green-700 dark:text-green-500"></div>
                <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-2.5 rounded-full bg-green-600 dark:bg-green-500"
                    style={{ width: profileData?.levelPercent + "%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {products.filter((i) => i.id != product.id).length >= 1 && (
            <div className={ profileData?.name != product.owner.username ? "":"hidden" }>
              <div className="mt-5 text-xl font-bold text-gray-900">
                Other items by {product.owner.username}...
              </div>
              <p className="pt-1 text-sm text-gray-500">
                {" "}
                You can trade <b> multiple </b> items at once. <b> Click </b> to
                select.
              </p>
              <div className="mt-2">
                <div className="container mx-auto grid grid-flow-dense grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-md py-1">
                  {products
                    .filter((i) => i.id != product.id)
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
              </div>
            </div>
          )}
          <form
            method="POST"
            onSubmit={handleSubmit}
            className={
              profileData?.name != product.owner.username ? "mt-2" : "hidden"
            }
          >
            <div className="">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Write a message with your request!
              </label>
              <textarea
                id="message"
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                className="row-span-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Here, you can let the trader know when you're free or discuss any other details about your request..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-[1rem] flex w-full items-center justify-center rounded-md border border-transparent bg-[#17742b] py-3 px-8 text-base font-bold text-white hover:bg-[#17742b] focus:outline-none focus:ring-2 focus:ring-[#1d8d35] focus:ring-offset-2"
            >
              Request trade with {product.owner.username}!
            </button>
          </form>
          <div className="pt-4">
            <div
              id="Error"
              className={
                "relative rounded-md border-2 border-red-500 bg-red-200 p-4 md:max-w-md" 
                
              }
              hidden={!showError}
            >
              <div className="absolute right-2 top-2 pt-4 align-top hover:cursor-pointer">
                <div
                  onClick={() => {
                    setShowError(false);
                  }}
                  className=""
                >
                  <XMarkIcon className="m-auto h-5 w-5 stroke-black stroke-2" />
                </div>
              </div>
              <label className="font-bold">
                {"Uh oh"}
              </label>
              <br />
              <label>{err}</label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Trading;
