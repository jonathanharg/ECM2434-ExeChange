import React from "react";
import Itemtile from "./Itemtile";

const products = [
  {
    id: 1,
    name: "Cowboy Hat",
    href: "#",
    imageSrc:
      "https://d3kbgunirza9ax.cloudfront.net/8BHR3LYrGqw/f:jpg/c:3024:3024:nowe:0:504/rs:fill:720:720:0/aW1hZ2UvcHJvZHVjdC8yZTdkNzZlZS1lNjRkLTQ1YWMtYmI3MC0yZWY5MGZkMzVjYmMuanBlZw",
    tag1: "Cowboy",
    tag2: "Hat",
  },
  {
    id: 2,
    name: "Fairy Costume",
    href: "#",
    imageSrc:
      "https://images1.vinted.net/t/01_00e2f_3VtNiLoFd6iQbzDKPheUqZsX/f800/1668927158.jpeg?s=f1de2fa266d24ce5744857d66b167b5ec541e6a7",
    tag1: "Fairy",
    tag2: "Dress",
  },
  {
    id: 3,
    name: "Bald Mask",
    href: "#",
    imageSrc: "https://m.media-amazon.com/images/I/61CiEy804cL._AC_SL1500_.jpg",
    tag1: "Baldy",
    tag2: "Headware",
  },
  {
    id: 4,
    name: "Spiderman Costume",
    href: "#",
    imageSrc:
      "https://da1urhpfd469z.cloudfront.net/uploads/advertphotos/21/1023/46416668-971-640x1028.jpg",
    tag1: "Superhero",
    tag2: "Onesie",
  },
  {
    id: 1,
    name: "Cowboy Hat",
    href: "#",
    imageSrc:
      "https://d3kbgunirza9ax.cloudfront.net/8BHR3LYrGqw/f:jpg/c:3024:3024:nowe:0:504/rs:fill:720:720:0/aW1hZ2UvcHJvZHVjdC8yZTdkNzZlZS1lNjRkLTQ1YWMtYmI3MC0yZWY5MGZkMzVjYmMuanBlZw",
    tag1: "Cowboy",
    tag2: "Hat",
  },
  {
    id: 2,
    name: "Fairy Costume",
    href: "#",
    imageSrc:
      "https://images1.vinted.net/t/01_00e2f_3VtNiLoFd6iQbzDKPheUqZsX/f800/1668927158.jpeg?s=f1de2fa266d24ce5744857d66b167b5ec541e6a7",
    tag1: "Fairy",
    tag2: "Dress",
  },
  {
    id: 3,
    name: "Bald Mask",
    href: "#",
    imageSrc: "https://m.media-amazon.com/images/I/61CiEy804cL._AC_SL1500_.jpg",
    tag1: "Baldy",
    tag2: "Headware",
  },
  {
    id: 4,
    name: "Spiderman Costume",
    href: "#",
    imageSrc:
      "https://da1urhpfd469z.cloudfront.net/uploads/advertphotos/21/1023/46416668-971-640x1028.jpg",
    tag1: "Superhero",
    tag2: "Onesie",
  },
  // More products...
];

function Marketplace() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="max-w-2xl mx-auto">

        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-200 dark:text-green-700">Filter</label>
              <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-green-900 dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Choose a category</option>
              <option value="Cowboy">Cowboy</option>
              <option value="Fairy">Fairy</option>
              <option value="Princess">Princess</option>
              <option value="Disco">Disco</option>
              <option value="Valentines">Valentines</option> 
          </select>

        <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Itemtile
              id={product.id}
              name={product.name}
              href={product.href}
              imageSrc={product.imageSrc}
              tag1={"#" + product.tag1}
              tag2={"#" + product.tag2}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
