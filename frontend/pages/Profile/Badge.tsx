import React from "react";

export type Location = {
  id: number;
  colour: string;
  place: string;
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  >;
  trades: number;
};

function Badge(location: Location) {
  const thiscolour =
    "h-12 w-12 " + location.colour + " rounded-full flex items-center";

  return (
    <div className="flex w-full flex-col space-y-2 pt-2">
      <div className="flex h-12 w-full">
        <div className="h-full w-2/12">
          <div className={thiscolour}>
            {/* {location.icon} */}
            {React.createElement(location.icon, {
              className: "stroke-white m-auto w-10 h-10",
            })}
          </div>
        </div>
        <div className="flex h-full w-6/12 items-start">
          <p className="my-auto text-lg font-semibold">{location.place}</p>
        </div>
        <div className="flex h-full w-4/12 items-end justify-end">
          <button className="float-right my-auto flex rounded-md bg-green-800 px-5 py-1 font-medium text-white">
            {location.trades} Trades
          </button>
        </div>
      </div>
    </div>
  );
}

export default Badge;
