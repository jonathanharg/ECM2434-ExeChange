import React from "react";
import { useAuthUser } from "react-auth-kit";

export interface Product {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  tags: string[];
}

function Itemtile(product: Product) {
  const auth = useAuthUser();
  return (
    <div key={product.id} className="group relative">
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={product.imageSrc}
          className={`h-full w-full object-cover object-center ${
            auth() ? "" : "blur-lg"
          } lg:h-full lg:w-full`}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={product.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.tags}</p>
        </div>
      </div>
    </div>
  );
}

export default Itemtile;
