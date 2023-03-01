import React from "react";

export interface Product {
    id: number;
    caption: string;
    href: string;
    image: string;
    tags: tag[];
    owner: owner;
  }

export type owner = {
    id: number;
    username: string;
  };
  
export type tag = {
    id: number;
    readonly value: string;
    label: string;
  };

export function Itemtile(product: Product) {

    return(
      <div key={product.id} className="group relative">
        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={product.image}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.caption}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {product.tags.map((t) => t.value).join(", ")}
            </p>
          </div>
        </div>
      </div>
    )
  }