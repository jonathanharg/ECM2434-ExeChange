import React, { useEffect, useState } from "react";
import { Itemtile, Product, tag } from "./Itemtile";
import Select from "react-select";

function Marketplace() {
  const [searchState, setSearchState] = useState(new Set<string>());
  const [tags, setTags] = useState<tag[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  function fetchProducts() {
    return fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }

  function fetchTags() {
    return fetch("/api/tags")
      .then((response) => response.json())
      .then((data) => setTags(data));
  }

  useEffect(() => {
    fetchProducts();
    fetchTags();
  }, []);

  tags.map((i) => (i.label = i.value));

  function isSuperset(set, subset) {
    for (const elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  }

  function handleTag(e, meta) {
    if (meta.action === "select-option") {
      e.map((i) =>
        setSearchState((searchState) => new Set([...searchState, i.value]))
      );
    } else if (meta.action === "pop-value" || meta.action === "remove-value") {
      console.log(e.map((i) => i.value));
      setSearchState(
        (searchState) =>
          new Set([...searchState].filter((x) => x == e.map((i) => i.value)))
      );
    } else if (meta.action === "clear") {
      setSearchState(new Set());
    }
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
          <Select
            isMulti
            options={tags}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e, actionMeta) => handleTag(e, actionMeta)}
          />
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
                <Itemtile key={product.id} {...product}/>
                /*  trading={true} */
              ))}
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
