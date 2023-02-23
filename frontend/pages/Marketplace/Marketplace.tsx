import React, { useEffect, useState } from "react";
import Itemtile from "./Itemtile";
import { Product } from "./Itemtile";
import { useAuthUser } from "react-auth-kit";

// const products = [
//   {
//     id: 1,
//     name: "Cowboy Hat",
//     href: "#",
//     imageSrc:
//       "https://d3kbgunirza9ax.cloudfront.net/8BHR3LYrGqw/f:jpg/c:3024:3024:nowe:0:504/rs:fill:720:720:0/aW1hZ2UvcHJvZHVjdC8yZTdkNzZlZS1lNjRkLTQ1YWMtYmI3MC0yZWY5MGZkMzVjYmMuanBlZw",
//     tags: ["Cowboy","Hat"],
//   },
//   {
//     id: 2,
//     name: "Fairy Costume",
//     href: "#",
//     imageSrc:
//       "https://images1.vinted.net/t/01_00e2f_3VtNiLoFd6iQbzDKPheUqZsX/f800/1668927158.jpeg?s=f1de2fa266d24ce5744857d66b167b5ec541e6a7",
//       tags: ["Fairy","Dress","Costume"],
//   },
//   {
//     id: 3,
//     name: "Bald Mask",
//     href: "#",
//     imageSrc: "https://m.media-amazon.com/images/I/61CiEy804cL._AC_SL1500_.jpg",
//     tags: ["Baldy","Hat"],
//   },
//   {
//   id: 4,
//   name: "Spiderman Costume",
//   href: "#",
//   imageSrc:
//     "https://da1urhpfd469z.cloudfront.net/uploads/advertphotos/21/1023/46416668-971-640x1028.jpg",
//   tags: ["Superhero"],
// },
//   // More products...
// ];

function Marketplace() {
  const auth = useAuthUser();

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
          >
            <option selected>Choose a category</option>
            <option value="Cowboy">Cowboy</option>
            <option value="Fairy">Fairy</option>
            <option value="Princess">Princess</option>
            <option value="Disco">Disco</option>
            <option value="Valentines">Valentines</option>
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
