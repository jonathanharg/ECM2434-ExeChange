import React from "react";
import Itemtile from "./Itemtile"

const products = [
  {
  },
  {
  },
  {
  },
  {
  },
  // More products...
]

function Marketplace(){
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => <Itemtile />)}
        </div>
      </div>
    </div>
  )
}

export default Marketplace