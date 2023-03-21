import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        <Locations key={profileData?.id}{...profileData}/>
      </div>
      <div className="flex w-full flex-col px-4 pt-12">
        <MyItems/>
      </div>
    </div>
  );
}

export default Profile;
