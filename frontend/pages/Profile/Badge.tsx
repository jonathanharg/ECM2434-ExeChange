import React from "react";
import { ProfileTradeLocation,ProfileLocation, LocationProps} from "./Profile";
import { createElement } from "react";

import {
  ChatBubbleLeftRightIcon,
  PowerIcon,
  CameraIcon,
  UserGroupIcon,
  BookOpenIcon,
  CloudIcon,
  DocumentChartBarIcon,
  BuildingLibraryIcon,
  RocketLaunchIcon,
  NewspaperIcon,
  BuildingOffice2Icon,
  FilmIcon,
  MoonIcon,
  BeakerIcon,
  LightBulbIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";

function Badge(locationProp: LocationProps) {
  console.log("HELKJFALKD");
  console.log("TESTSTLAIJDFA: ", locationProp.location.name);
  return (
    <div className="flex w-full flex-col space-y-2 pt-2">
      <div className="flex h-12 w-full">
        <div className="h-full w-2/12">
          <div className="flex h-12 w-12 items-center rounded-full bg-green-700">
            {/* {location.icon} */}
            {/* {React.createElement(locationProp.locationSVG.icon, {
              className: "stroke-white m-auto w-10 h-10",
            })} */}
          </div>
        </div>
        <div className="flex h-full w-6/12 items-start">
          <p className="my-auto text-lg font-semibold">{locationProp.location.name}</p>
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
