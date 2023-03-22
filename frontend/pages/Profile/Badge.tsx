import React from "react";
import { LocationProps } from "./Profile";

import { MapPinIcon } from "@heroicons/react/24/outline";

function Badge(locationProp: LocationProps) {
  return (
    <div className="flex w-full flex-col space-y-2 pt-2">
      <div className="flex h-12 w-full">
        <div className="h-full w-2/12">
          <div
            className={`flex h-10 w-10 items-center rounded-full ${locationProp.locationSVG.color}`}
          >
            {React.createElement(MapPinIcon, {
              className: "stroke-white m-auto w-8 h-8",
            })}
          </div>
        </div>
        <div className="flex h-full w-6/12 items-start">
          <p className="my-auto text-lg font-semibold">
            {locationProp.location.name}
          </p>
        </div>
        <div className="flex h-full w-4/12 items-end justify-end">
          <button className="float-right my-auto flex rounded-md bg-green-800 px-5 py-1 font-medium text-white">
            {locationProp.location.trades} Trades
          </button>
        </div>
      </div>
    </div>
  );
}

export default Badge;
