import React, { useEffect, useState } from "react";
import Itemtile from "./Itemtile";
import { Product, tag } from "./Itemtile";
import { useAuthUser } from "react-auth-kit";

function Marketplace() {
  const auth = useAuthUser();
  const [searchState, setSearchState] = useState<tag>();
  const [products, setProducts] = useState<Product[]>([]);
  const fetchProducts = () => {
    return fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-2xl">
          <label
            htmlFor="countries"
            className="mb-2 block text-sm font-medium text-gray-400 dark:text-green-700"
          >
            Filter
          </label>
          <select
            id="countries"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-400 focus:border-green-800 focus:ring-green-800 dark:border-gray-600 dark:bg-gray-200 dark:text-green-900 dark:placeholder-gray-400 dark:focus:border-green-800 dark:focus:ring-green-800"
            // onChange={(e) => setSearchState(e.target.value)}
          >
            {/* {tagArray.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))} */}
          </select>
        </div>
        {/* <h1>Hello {auth().user}</h1> */}
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
          {products.map((product) => (
            <Itemtile key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
