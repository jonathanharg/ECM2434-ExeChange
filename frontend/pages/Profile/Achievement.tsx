import React from "react";
import { ProfileAchievement } from "./Profile";

function Achievement(achievement: ProfileAchievement) {
  const format =
    "font-ligth flex w-32 rounded-full " +
    achievement?.colour +
    " px-4 py-2 text-white";
  return <button className={format}>{achievement?.text}</button>;
}

export default Achievement;
