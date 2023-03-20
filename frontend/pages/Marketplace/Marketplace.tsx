import React, { useEffect, useState } from "react";
import { Product } from "./Itemtile";
import TagSelect from "../../components/TagSelect";
import MarketplaceItem from "./MarketplaceItem";

function Marketplace() {
  const [searchState, setSearchState] = useState(new Set<Tag>());

  const [products, setProducts] = useState<Product[]>([]);

  function fetchProducts() {
    let url = "/api/marketplace";
    if (searchState.size > 0) {
      url +=
        "?tags=" +
        Array.from(searchState)
          .map((tag) => tag.id)
          .join("+");
    }

    return fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }

  useEffect(() => {
    fetchProducts();
  }, [searchState]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-4 px-6 lg:max-w-7xl">
        <div className="mx-auto mb-6 max-w-2xl">
          <label
            htmlFor="countries"
            className="mb-2 block text-sm font-medium text-gray-400 dark:text-green-800"
          >
            Search by tag
          </label>
          <TagSelect setState={setSearchState} />
        </div>
        <div className="grid grid-cols-2 gap-y-4 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <MarketplaceItem key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
