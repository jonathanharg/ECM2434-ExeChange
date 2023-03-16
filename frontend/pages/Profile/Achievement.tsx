import React from "react";

export interface Reward {
    id: number;
    text: string;
    colour: string;
}

function Achievement(reward: Reward) {

  const format = 
    "font-ligth flex w-32 rounded-full " +reward.colour+ " px-4 py-2 text-white";
  return (
    <button className= {format} >
        {reward.text}
    </button>
  );
}

export default Achievement;