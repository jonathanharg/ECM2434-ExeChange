import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Itemtile, { Product } from "../Marketplace/Itemtile";
import { DeleteItem } from "./DeleteItem";
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
import Badge, { Location } from "./Badge";
import Tradealert, { Trade } from "./Tradealert";
import Achievement, { achievement } from "./Achievement";
import Profilestats, { ProfileData } from "./Profilestats";


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
import { Locations } from "./Locations";




function Profile() {
  const { username } = useParams();
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const [searchState, setSearchState] = useState(new Set<string>());
  const [products, setProducts] = useState<Product[]>([]);

  function fetchProducts() {
    return fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }

  function isSuperset(set, subset) {
    for (const elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  }

  function deleteItem(id: number) {
    setProducts(products.filter((product) => product.id != id));
  }

  const myProfile = () => {
    if (!isAuthenticated) {
      return false;
    }

    return auth()!.user == username
  }

  const locations = [
    {
      colour: "bg-yellow-400",
      name: "Lafrowda",
      icon: UserGroupIcon,
      trades: 3,
    },
    {
      colour: "bg-blue-500",
      name: "Library",
      icon: BookOpenIcon,
      trades: 4,
    },
    {
      colour: "bg-orange-600",
      name: "Holland Hall",
      icon: CameraIcon,
      trades: 3,
    }
  ]

  const [profileData, setProfileData] = useState<ProfileData>();

  function fetchProfileData() {
    return fetch("/api/profile/" + username)
      .then((response) => response.json())
      .then((data) => setProfileData(data));
  }

  useEffect(() => {
    fetchProducts();
    fetchProfileData();
  }, [username]);

  return (
    <div className="font-poppins mx-auto flex min-h-screen max-w-lg flex-col bg-white bg-cover bg-center bg-no-repeat px-4 opacity-100 lg:max-w-5xl">
      <div className="flex items-center justify-between px-1 pt-4">
        <div>
          <p className="font-semibold">
            {myProfile() ? "My Profile" : username}
          </p>
        </div>
      </div>
      <Profilestats key={profileData?.id} {...profileData} />
      <div className="flex w-full flex-col px-4 pt-12">
        <p className="font-semibold text-gray-600">
          {myProfile() ? (
            <>My Achievements</>
          ) : (
            <>{username}&apos;s Achievements</>
          )}
        </p>
        <div className="flex w-full space-x-2 pt-2">
          {profileData?.achievements?.map((achievement) => (
            <Achievement key={achievement?.id} {...achievement} />
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col px-4 pt-12">
        <p className="font-semibold text-gray-600">Location Badges</p>
        <Locations locations={locations}/>
      </div>
      <div className="flex w-full flex-col px-4 pt-12">
        <MyItems/>
        </div>
    </div>
  );
}

export default Profile;
