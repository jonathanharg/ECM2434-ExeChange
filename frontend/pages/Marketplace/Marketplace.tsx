import React, { useEffect, useState } from "react";
import Itemtile from "./Itemtile";
import { Product, tag } from "./Itemtile";
import Select from 'react-select';

function Marketplace() {

  const [searchState, setSearchState] = useState('');
  const [tags, setTags] = useState<tag[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  async function fetchProducts() {
    return await fetch("/api/marketplace")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  };

  async function fetchTags() {
    return await fetch("/api/tags")
      .then((response) => response.json())
      .then((data) => setTags(data));
  };

  useEffect(() => {
    fetchProducts();
    fetchTags();
  }, []);
  
  tags.map((i) => i.label = i.value)

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-2xl">
          <label
            htmlFor="countries"
            className="mb-2 block text-sm font-medium text-gray-400 dark:text-green-700"
          >
            Search by tag
          </label>
          <Select  
          isMulti
          options={tags}
          
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(e) => e.map((i) => setSearchState(i.value))}
          /> 
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
         { searchState != '' ? products
            .filter((product) =>
              product.tags.map((t) => t.value).includes(searchState)
            )
            .map((product) => (
              <Itemtile key={product.id} {...product} />
            )): products.map((product) => (<Itemtile key={product.id} {...product}/>))} 
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
