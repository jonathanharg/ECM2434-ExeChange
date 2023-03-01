import React, { Component, useEffect, useState, createElement } from "react";
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
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Tradealert from "./Tradealert";
import { Location } from "./Badge";
import Badge from "./Badge";
import { create } from "domain";

export interface Trade {
  id: number;
  initiator: string;
  location: string;
  time: string;
  date: string;
}

interface ProfileData {
  levelPercent: number;
  name: string;
  level: number;
}

const Components = {
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
};

const locations: Location[] = [
  {
    id: 1,
    colour: "bg-yellow-400",
    place: "Lafrowda",
    icon: UserGroupIcon,
    trades: 3,
  },
  {
    id: 2,
    colour: "bg-blue-500",
    place: "Library",
    icon: BookOpenIcon,
    trades: 4,
  },
  {
    id: 3,
    colour: "bg-orange-600",
    place: "Holland Hall",
    icon: CameraIcon,
    trades: 3,
  },
  {
    id: 4,
    colour: "bg-purple-500",
    place: "Sports Park",
    icon: PowerIcon,
    trades: 3,
  },
  {
    id: 5,
    colour: "bg-green-900",
    place: "Forum",
    icon: ChatBubbleLeftRightIcon,
    trades: 2,
  },
  {
    id: 6,
    colour: "bg-pink-600",
    place: "Mardon",
    icon: CloudIcon,
    trades: 3,
  },
  {
    id: 7,
    colour: "bg-blue-700",
    place: "Peter Chalk",
    icon: DocumentChartBarIcon,
    trades: 3,
  },
  {
    id: 8,
    colour: "bg-gray-600",
    place: "Reed Hall",
    icon: BuildingLibraryIcon,
    trades: 2,
  },
  {
    id: 9,
    colour: "bg-red-500",
    place: "Physics Building",
    icon: RocketLaunchIcon,
    trades: 4,
  },
  {
    id: 10,
    colour: "bg-teal-600",
    place: "Queen's",
    icon: NewspaperIcon,
    trades: 3,
  },
  {
    id: 11,
    colour: "bg-teal-900",
    place: "Washington Singer",
    icon: MoonIcon,
    trades: 3,
  },
  {
    id: 12,
    colour: "bg-orange-800",
    place: "Old Library",
    icon: FilmIcon,
    trades: 5,
  },
  {
    id: 13,
    colour: "bg-pink-700",
    place: "Amory",
    icon: BeakerIcon,
    trades: 3,
  },
  {
    id: 14,
    colour: "bg-yellow-600",
    place: "Innovation Centre",
    icon: LightBulbIcon,
    trades: 4,
  },
  {
    id: 15,
    colour: "bg-purple-800",
    place: "Northcott Theatre",
    icon: TicketIcon,
    trades: 3,
  },
  {
    id: 16,
    colour: "bg-green-400",
    place: "East Park",
    icon: BuildingOffice2Icon,
    trades: 3,
  },
];

function Profile() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>();

  function fetchTrades() {
    return fetch("/api/pendingtrades")
      .then((response) => response.json())
      .then((data) => setTrades(data));
  }

  function fetchProfileData() {
    return fetch("/api/profiledata")
      .then((response) => response.json())
      .then((data) => setProfileData(data));
  }

  useEffect(() => {
    fetchTrades();
    fetchProfileData();
  }, []);

  return (
    <div className="font-poppins mx-auto flex min-h-screen max-w-lg flex-col bg-white bg-cover bg-center bg-no-repeat px-4 opacity-100 lg:max-w-5xl">
      <div className="flex items-center justify-between px-1 pt-4">
        <div>
          <p className="font-semibold">My Profile</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 pt-12">
        {/* <div className="flex h-24 w-24 items-center rounded-full bg-blue-600">
        </div> */}
        <UserCircleIcon className="h-32 w-32" />
        <div className="flex w-9/12 items-center">
          <div className="flex w-10/12 flex-col pl-4 leading-none">
            <p className="text-2xl font-bold">{profileData?.name}</p>
            <p className="pt-1 text-sm font-light text-gray-700">
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
          <div className="w-2/12">
            <div>
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M9.243 19H21v2H3v-4.243l9.9-9.9 4.242 4.244L9.242 19zm5.07-13.556l2.122-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z" /></svg> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col px-4 pt-12">
        {trades.map((trade) => (
          <Tradealert key={trade.id} {...trade} />
        ))}
      </div>
      <div className="flex w-full flex-col px-4 pt-12">
        <p className="font-semibold text-gray-600">My Achievements</p>
        <div className="flex w-full space-x-2 pt-2">
          <button className="font-ligth flex w-32 rounded-full bg-gray-800 px-4 py-2 text-white">
            5 days in a row
          </button>
          <button className="font-ligth flex w-32 rounded-full bg-green-800 px-4 py-2 text-white">
            Halloween trader
          </button>
          <button className="font-ligth flex w-32 rounded-full bg-red-800 px-4 py-2 text-white">
            5+ trades
          </button>
        </div>
      </div>

      <div className="flex w-full flex-col px-4 pt-12">
        <p className="font-semibold text-gray-600">Location Badges</p>
        {locations.map((location) => (
          <Badge key={location.id} {...location} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
