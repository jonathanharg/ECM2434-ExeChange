import React, { useEffect, useState } from "react";
import {
    UserCircleIcon,
  } from "@heroicons/react/24/outline";


interface ProfileData {
    levelPercent: number;
    name: string;
    level: number;
}


function Profilestats() {
    const [profileData, setProfileData] = useState<ProfileData>();

    function fetchProfileData() {
        return fetch("/api/profiledata")
          .then((response) => response.json())
          .then((data) => setProfileData(data));
      }

      useEffect(() => {
        
        fetchProfileData();
      }, []);

  return (
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
  );
}

export default Profilestats;