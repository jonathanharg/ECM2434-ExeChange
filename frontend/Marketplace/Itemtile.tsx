import React from "react";

function Itemtile({
    id: ID,
    name: name,
    href: href,
    imageSrc: imageSrc,
    tag: tag
}) {
    return (

        <div key={ID} className="group relative">
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                    src={imageSrc}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a href={href}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {name}
                        </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{tag}</p>
                </div>
            </div>
        </div>

    )
}

export default Itemtile