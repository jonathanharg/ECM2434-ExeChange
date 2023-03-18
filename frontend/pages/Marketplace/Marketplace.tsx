import React, { useEffect, useState } from "react";
import Itemtile, { Tag } from "./Itemtile";
import { Product } from "./Itemtile";
import TagSelect from "../../components/TagSelect";

function Marketplace() {
  const [searchState, setSearchState] = useState(new Set<string | Tag>());

  const [products, setProducts] = useState<Product[]>([]);

  function fetchProducts() {
    return fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function isSuperset<T>(set: Set<T>, subset: Set<T>) {
    for (const elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-2xl">
          <label
            htmlFor="countries"
            className="mb-2 block text-sm font-medium text-gray-400 dark:text-green-800"
          >
            Search by tag
          </label>
          <TagSelect setState={setSearchState} state={searchState} />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
          {searchState.size != 0
            ? products
                .filter((product) =>
                  isSuperset(
                    new Set(product.tags.map((i) => i.value)),
                    searchState
                  )
                )
                .map((product) => <Itemtile key={product.id} {...product} />)
            : products.map((product) => (
                <Itemtile key={product.id} {...product} />
                /*  trading={true} */
              ))}
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
