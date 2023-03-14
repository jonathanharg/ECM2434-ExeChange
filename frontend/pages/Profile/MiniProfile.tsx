import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Profilestats from "./Profilestats";

function MiniProfile() {
  return (
    <div className="font-poppins mx-auto flex min-h-screen max-w-lg flex-col bg-white bg-cover bg-center bg-no-repeat px-4 opacity-100 lg:max-w-5xl">
      <Profilestats />
    </div>
  );
}

export default MiniProfile;
