import React, { useEffect, useState } from "react";
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
import Itemtile, { Product } from "../Marketplace/Itemtile";
import { DeleteItem } from "./DeleteItem";
import { ProfileData } from "./Profilestats"

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

export function Locations(profileData: ProfileData) {
    const [searchState, setSearchState] = useState(new Set<string>());

    const myLocations = profileData.locations;

    function isSuperset(set, subset) {
        for (const elem of subset) {
            if (!set.has(elem)) {
                return false;
            }
        }
        return true;
    }

    return (
        <>
        <p className="font-semibold text-gray-600">My Items</p>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
            {searchState.size != 0
            ? locations
                .filter((product) =>
                    isSuperset(
                    new Set(product.tags.map((i) => i.value)),
                    searchState
                    )
                )
                .map((product) => <Itemtile key={product.id} {...product} />)
            : locations.map((product) => (
                <>
                <div className="relative">
                    <Itemtile key={product.id} {...product} />
                    <div className="absolute top-0 right-0 rounded">
                        <DeleteItem key={product.id} {...product} />
                    </div>
                </div>
                </>
                ))}
        </div>
        </>
    )
}

