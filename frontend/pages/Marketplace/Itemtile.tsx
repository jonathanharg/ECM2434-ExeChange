import React from "react";
import { useAuthUser } from "react-auth-kit";

export interface Product {
  id: number;
  caption: string;
  href: string;
  imageSrc: string;
  tags: tag[];
  owner: owner;
}

export type owner = {
  id: number;
  username: string;
};

export type tag = {
  id?: number;
  name?: string;
};

function Itemtile(product: Product) {
  const auth = useAuthUser();
  return (
    <div key={product.id} className="group relative rounded-md p-4 shadow">
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={product.imageSrc}
          className={`h-full w-full object-cover object-center ${
            auth() ? "" : "blur-lg"
          } lg:h-full lg:w-full`}
        />
      </div>
      <div className="mt-2 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={product.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.caption}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {product.tags.map((t) => t.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Itemtile;
