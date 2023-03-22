import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Itemtile, { Product } from "../Marketplace/Itemtile";
import Profilestats from "./Profilestats";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import DeleteItem from "./DeleteItem";
import Badge from "./Badge";
import Achievement from "./Achievement";
import { number } from "zod";
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

export type ProfileTradeLocation = {
  color: string;
  name: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
};

const tradeLocations: ProfileTradeLocation[] = [
  {
    color: "bg-yellow-400",
    name: "Lafrowda",
    icon: UserGroupIcon,
  },
  {
    color: "bg-blue-500",
    name: "Library",
    icon: BookOpenIcon,
  },
  {
    color: "bg-orange-600",
    name: "Holland Hall",
    icon: CameraIcon,
  },
  {
    color: "bg-purple-500",
    name: "Sports Park",
    icon: PowerIcon,
  },
  {
    color: "bg-green-900",
    name: "Forum",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    color: "bg-pink-600",
    name: "Mardon",
    icon: CloudIcon,
  },
  {
    color: "bg-blue-700",
    name: "Peter Chalk",
    icon: DocumentChartBarIcon,
  },
  {
    color: "bg-gray-600",
    name: "Reed Hall",
    icon: BuildingLibraryIcon,
  },
  {
    color: "bg-red-500",
    name: "Physics Building",
    icon: RocketLaunchIcon,
  },
  {
    color: "bg-teal-600",
    name: "Queen's",
    icon: NewspaperIcon,
  },
  {
    color: "bg-teal-900",
    name: "Washington Singer",
    icon: MoonIcon,
  },
  {
    color: "bg-orange-800",
    name: "Old Library",
    icon: FilmIcon,
  },
  {
    color: "bg-pink-700",
    name: "Amory",
    icon: BeakerIcon,
  },
  {
    color: "bg-yellow-600",
    name: "Innovation Centre",
    icon: LightBulbIcon,
  },
  {
    color: "bg-purple-800",
    name: "Northcott Theatre",
    icon: TicketIcon,
  },
  {
    color: "bg-green-400",
    name: "East Park",
    icon: BuildingOffice2Icon,
  },
];

export type LocationProps = {
  location: ProfileLocation;
  locationSVG: ProfileTradeLocation;
}

export type ProfileData = {
  id: number;
  levelPercent: number;
  name: string;
  level: number;
  username: string;
  achievements: ProfileAchievement[];
  locations: { [name: string]: number }; // dict type
  current_xp: number;
  profile_level: number;
};

export type ProfileAchievement = {
  id: number;
  text: string;
  colour: string;
  xp_achieved: number;
};

export type ProfileLocation = {
  name: string;
  trades: number;
};

function Profile() {
  const { username } = useParams();
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const [searchState, setSearchState] = useState(new Set<string>());
  const [products, setProducts] = useState<Product[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>();
  const [locations, setLocations] = useState<LocationProps[]>([]);

  function fetchProfileData() {
    return fetch("/api/profile/" + username)
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
        setLocations(getLocations(data.locations));
      });
  }

  function fetchProducts() {
    const url = `/api/marketplace?username=${username}`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }

  function isSuperset(set: Set<string>, subset: Set<string>) {
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

  function getLocations(locations: {[name: string]:number}) {
    const profileLocations: LocationProps[] = [];
    for (const key in locations) {
      const currLocation: ProfileLocation = {
        name: key,
        trades: locations[key],
      };

      for(let i = 0; i < tradeLocations.length; i++) {
        if(tradeLocations[i]?.name == currLocation.name) {
          const locationProp: LocationProps = {
            location: currLocation,
            locationSVG: tradeLocations[i]?.icon,
          }
          profileLocations.push(locationProp);
          break;
        }
      }
    }



    return profileLocations;
  }

  const myProfile = () => {
    if (!isAuthenticated) {
      return false;
    }

    return auth()!.user == username;
  };

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
        {locations.map((location) => {
          <Badge {...location} />;
        })}
      </div>

      <div className="flex w-full flex-col px-4 pt-12">
        <div className="flex w-full flex-col px-4 pt-12">
          <p className="font-semibold text-gray-600">
            {myProfile() ? <>My Items</> : <>{username}&apos;s Items</>}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
            {searchState.size != 0
              ? products
                  .filter((product) =>
                    isSuperset(
                      new Set(product.tags.map((i) => i.value)),
                      searchState
                    )
                  )
                  .map((product) => <Itemtile key={product.id} {...product} />)
              : products.map((product) =>
                  myProfile() == true ? (
                    <>
                      <div className="relative">
                        <Itemtile key={product.id} {...product} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative">
                        <Itemtile key={product.id} {...product} />
                      </div>
                    </>
                  )
                )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
