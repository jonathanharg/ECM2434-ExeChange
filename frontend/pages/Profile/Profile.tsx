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

// Profile.tsx, turn into [{name:"Lafrowda", trades: 4, color: ""...}, ...]

// Displayed by Locations.tsx

const locations: ProfileTradeLocation[] = [
  {
    colour: "bg-yellow-400",
    name: "Lafrowda",
    icon: UserGroupIcon,
    trades: 3,
  },
  {
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
  username: string;
  achievements: ProfileAchievement[];
  current_xp: number;
  profile_level: number;
};

export type ProfileAchievement = {
  id: number;
  text: string;
  colour: string;
  xp_achieved: number;
};

const BACKEND_DATA = { Lafrowda: 10, "Northcott Theatre": 4 };

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

    return auth()!.user == username;
  };

  // const locations = BACKEND_DATA.map(...)

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
    },
  ];

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
        {locations.map((location) => (
          <Badge {...location} />
        ))}
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
                        <div className="absolute top-0 right-0 rounded">
                          <DeleteItem
                            key={product.id}
                            deleteItem={deleteItem}
                            product={product}
                          />
                        </div>
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
