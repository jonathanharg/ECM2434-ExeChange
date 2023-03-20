import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import Tradealert from "./Tradealert";
import { Location } from "./Badge";
import Badge from "./Badge";
import { Trade } from "./Tradealert";
import { MyItems } from "./MyItemsProfile";
import Achievement from "./Achievement";
import { achievement } from "./Achievement";
import Profilestats from "./Profilestats";
import { ProfileData } from "./Profilestats"
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";

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
  let { username } = useParams();
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();

  const myProfile = () => {
    if (!isAuthenticated) {
      return false
    }

    return auth().user == username
  }

  const [profileData, setProfileData] = useState<ProfileData>();

  function fetchProfileData(){
    return fetch("/api/profile/"+ username)
    .then((response) => response.json())
    .then((data) => setProfileData(data));
  }

  useEffect(() => {
    fetchProfileData();
  }, [username]);

  return (
    <div className="font-poppins mx-auto flex min-h-screen max-w-lg flex-col bg-white bg-cover bg-center bg-no-repeat px-4 opacity-100 lg:max-w-5xl">
      <div className="flex items-center justify-between px-1 pt-4">
        <div>
          <p className="font-semibold">{(myProfile() ? "My Profile": username)}</p>
        </div>
      </div>
      <Profilestats key={profileData?.id}{...profileData}/>
      <div className="flex w-full flex-col px-4 pt-12">
        <p className="font-semibold text-gray-600">My Achievements</p>
        <div className="flex w-full space-x-2 pt-2">
            {profileData?.achievements?.map((achievement) => (
            <Achievement key={achievement?.id} {...achievement} />
            ))}
        </div>
      </div>

      <div className="flex w-full flex-col px-4 pt-12">
        <p className="font-semibold text-gray-600">Location Badges</p>
        {locations.map((location) => (
          <Badge key={location.id} {...location} />
        ))}
      </div>
      <div className="flex w-full flex-col px-4 pt-12">
        <MyItems/>
      </div>
    </div>
  );
}

export default Profile;
