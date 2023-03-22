import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Itemtile, { Product } from "../Marketplace/Itemtile";
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
import Profilestats from "./Profilestats";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import DeleteItem from "./DeleteItem";
import Badge from "./Badge";
import Achievement from "./Achievement";

// API: locations: ["Lafrowda":4, "Birks": 10]
// Displayed by Locations.tsx

const locations: ProfileTradeLocation[] = [
  {
    colour: "bg-yellow-400",
    name: "Lafrowda",
    icon: UserGroupIcon,
    trades: 0,
  },
  {
    colour: "bg-blue-500",
    name: "Library",
    icon: BookOpenIcon,
    trades: 0,
  },
  {
    colour: "bg-orange-600",
    name: "Holland Hall",
    icon: CameraIcon,
    trades: 0,
  },
  {
    colour: "bg-purple-500",
    name: "Sports Park",
    icon: PowerIcon,
    trades: 0,
  },
  {
    colour: "bg-green-900",
    name: "Forum",
    icon: ChatBubbleLeftRightIcon,
    trades: 0,
  },
  {
    colour: "bg-pink-600",
    name: "Mardon",
    icon: CloudIcon,
    trades: 0,
  },
  {
    colour: "bg-blue-700",
    name: "Peter Chalk",
    icon: DocumentChartBarIcon,
    trades: 0,
  },
  {
    colour: "bg-gray-600",
    name: "Reed Hall",
    icon: BuildingLibraryIcon,
    trades: 0,
  },
  {
    colour: "bg-red-500",
    name: "Physics Building",
    icon: RocketLaunchIcon,
    trades: 0,
  },
  {
    colour: "bg-teal-600",
    name: "Queen's",
    icon: NewspaperIcon,
    trades: 0,
  },
  {
    colour: "bg-teal-900",
    name: "Washington Singer",
    icon: MoonIcon,
    trades: 0,
  },
  {
    colour: "bg-orange-800",
    name: "Old Library",
    icon: FilmIcon,
    trades: 0,
  },
  {
    colour: "bg-pink-700",
    name: "Amory",
    icon: BeakerIcon,
    trades: 0,
  },
  {
    colour: "bg-yellow-600",
    name: "Innovation Centre",
    icon: LightBulbIcon,
    trades: 0,
  },
  {
    colour: "bg-purple-800",
    name: "Northcott Theatre",
    icon: TicketIcon,
    trades: 0,
  },
  {
    colour: "bg-green-400",
    name: "East Park",
    icon: BuildingOffice2Icon,
    trades: 0,
  },
];

export type ProfileTradeLocation = {
  colour: string;
  name: string;
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  >;
  trades: number;
};

export type ProfileData = {
  id: number;
  levelPercent: number;
  name: string;
  level: number;
  username: string;
  achievements: ProfileAchievement[];
  locations: ProfileLocations[];
  current_xp: number;
  profile_level: number;
};

export type ProfileAchievement = {
  id: number;
  text: string;
  colour: string;
  xp_achieved: number;
};

export type ProfileLocations = {
  name: string;
  trades: number;
};

//const BACKEND_DATA: {[key: string]: number} = { "Lafrowda": 10, "Northcott Theatre": 4 };
//Currently only doing the names of locations, changing the number of trade is going to be very tricky,
//might have to leave that out

function Profile() {
  const { username } = useParams();
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const [searchState, setSearchState] = useState(new Set<string>());
  const [products, setProducts] = useState<Product[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>();

  function fetchProfileData() {
    return fetch("/api/profile/" + username)
      .then((response) => response.json())
      .then((data) => setProfileData(data));
  }

  function fetchProducts() {
    const url = `/api/marketplace?username=${username}`
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

  const myProfile = () => {
    if (!isAuthenticated) {
      return false;
    }

    return auth()!.user == username;
  };

  /* function locationBadges(name: string){
    return locations.filter((location) => location.name == name);
  }

  I think something needs to be changed slightly with what this function actually returns,
  I think it might not be concatenating the arrays properly or something...
  function myLocationBadges(names: string[]){
    return names.map((location) => (locationBadges(location)));
  } */

  

/*   function LinkLocationToBadge(location: ProfileLocations) {
    return;
  } */

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

     {/*  <div className="flex w-full flex-col px-4 pt-12">
        <p className="font-semibold text-gray-600">Location Badges</p>
        {profileData?.locations?.map((location) => (
          <Badge {...myLocations} />
        ))}
      </div> */}
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
                        {/* <div className="absolute top-0 right-0 rounded">
                          <DeleteItem
                            key={product.id}
                            deleteItem={deleteItem}
                            product={product}
                          />
                        </div> */}
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
