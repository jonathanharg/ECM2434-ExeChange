import React from "react";
import {ChatBubbleLeftRightIcon, PowerIcon, CameraIcon, UserGroupIcon, BookOpenIcon, CloudIcon,
  DocumentChartBarIcon, BuildingLibraryIcon, RocketLaunchIcon, NewspaperIcon, EyeDropperIcon,
  FilmIcon, MoonIcon, BeakerIcon, LightBulbIcon} from "@heroicons/react/24/outline";

export interface Location {
  colour: string;
  place: string;
  icon: string;
  trades: number;
}

function Badge(location: Location) {
  const thiscolour = "h-12 w-12 " + location.colour + " rounded-full flex items-center";

  return (
    <div className="flex flex-col w-full pt-2 space-y-2">
    <div className="flex w-full h-12">
    <div className="w-2/12 h-full">
        <div className={thiscolour}>
          <LightBulbIcon className="stroke-white stroke-[1.9]" />
          {/* above will be location.icon */}
        </div>
        </div>
        <div className="w-6/12 h-full flex items-start">
            <p className="my-auto text-lg font-semibold">{location.place}</p>
        </div>
        <div className="w-4/12 h-full flex justify-end items-end">
            <button className="flex bg-red-600 rounded-md my-auto px-5 py-1 float-right text-white font-medium">{location.trades} Trades</button>
        </div>
    </div>
    </div>
  );
}

export default Badge;
