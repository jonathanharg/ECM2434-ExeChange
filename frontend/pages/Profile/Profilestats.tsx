import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export type ProfileData = {
  id: number;
  username: string;
  achievements: achievement[];
  current_xp: number;
  profile_level: number;
};

export type achievement = {
  id: number;
  text: string;
  colour: string;
  xp_achieved: number;
};

function Profilestats(profileData: ProfileData) {
  let { username } = useParams();

  return (
    <div className="flex items-center justify-between px-4 pt-12">
      <UserCircleIcon className="h-32 w-32" />
      <div className="flex w-9/12 items-center">
        <div className="flex w-10/12 flex-col pl-4 leading-none">
          <p className="text-2xl font-bold">{profileData?.username}</p>
          <p className="pt-1 text-sm font-light text-gray-700">
            Level {profileData?.profile_level}
          </p>
          <div className="mb-1 text-base font-medium text-green-700 dark:text-green-500"></div>
          <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2.5 rounded-full bg-green-600 dark:bg-green-500"
              style={{ width: profileData?.current_xp + "%" }}
            ></div>
          </div>
        </div>
        <div className="w-2/12"></div>
      </div>
    </div>
  );
}

export default Profilestats;
