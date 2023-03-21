import React from "react";

export interface ProfileData {
  id: number;
  username: string;
  achievements: achievement[];
  current_xp: number;
  profile_level: number;
}

export type achievement = {
  id: number;
  text: string;
  colour: string;
  xp_achieved: number;
};

function Achievement(achievement: achievement) {
  const format =
    "font-ligth flex w-32 rounded-full " +
    achievement?.colour +
    " px-4 py-2 text-white";
  return <button className={format}>{achievement?.text}</button>;
}

export default Achievement;
