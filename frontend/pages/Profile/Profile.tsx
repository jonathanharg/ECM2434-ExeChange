import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Itemtile, { Product } from "../Marketplace/Itemtile";
import Profilestats from "./Profilestats";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import Badge from "./Badge";
import {
  ChatBubbleLeftRightIcon,
  CameraIcon,
  UserGroupIcon,
  BookOpenIcon,
  DocumentChartBarIcon,
  BuildingLibraryIcon,
  NewspaperIcon,
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
    name: "Harrison",
    icon: BookOpenIcon,
  },
  {
    color: "bg-orange-600",
    name: "Holland Hall",
    icon: CameraIcon,
  },
  {
    color: "bg-green-900",
    name: "Forum",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    color: "bg-blue-700",
    name: "Peter Chalk",
    icon: DocumentChartBarIcon,
  },
  {
    color: "bg-teal-600",
    name: "Business School",
    icon: NewspaperIcon,
  },
  {
    color: "bg-pink-700",
    name: "Amory",
    icon: BeakerIcon,
  },
  {
    color: "bg-yellow-600",
    name: "SWIOT",
    icon: LightBulbIcon,
  },
  {
    color: "bg-purple-800",
    name: "Northcott Theatre",
    icon: TicketIcon,
  },
  {
    color: "bg-blue-300",
    name: "Sanctuary",
    icon: BuildingLibraryIcon,
  },
];

export type LocationProps = {
  location: ProfileLocation;
  locationSVG: ProfileTradeLocation;
};

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
  const [searchState, setSearchState] = useState(new Set<string>()); // eslint-disable-line
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
    // eslint-disable-line
    setProducts(products.filter((product) => product.id != id));
  }

  function getLocations(locations: { [name: string]: number }) {
    const profileLocations: LocationProps[] = [];
    for (const key in locations) {
      const currLocation: ProfileLocation = {
        name: key,
        trades: locations[key],
      };

      for (let i = 0; i < tradeLocations.length; i++) {
        if (tradeLocations[i]?.name == currLocation.name) {
          const locationProp: LocationProps = {
            location: currLocation,
            locationSVG: tradeLocations[i],
          };
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

    return auth()!.user == username; // eslint-disable-line
  };

  const acheivementsEmpty = () => {
    // eslint-disable-line
    if (profileData?.achievements.length == 0) {
      return true;
    }
  };

  const locationsEmpty = () => {
    if (locations.length == 0) {
      return true;
    }
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
        <p className="text-lg font-bold text-gray-600">Location Badges</p>
        {locationsEmpty() ? (
          <p className="text-md mt-2 text-gray-600 ">
            You have not unlocked any locations yet. <br />{" "}
            <b>Complete a trade</b> to unlock new locations!
          </p>
        ) : (
          <div>
            {locations.map((location) => (
              <Badge key={location.location.name} {...location} />
            ))}
          </div>
        )}
      </div>

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
  );
}

export default Profile;
