import React from "react";
import Itemtile from "./Itemtile";

const products = [
  {
    id: 1,
    name: "Cowboy Hat",
    href: "#",
    imageSrc:
      "https://d3kbgunirza9ax.cloudfront.net/8BHR3LYrGqw/f:jpg/c:3024:3024:nowe:0:504/rs:fill:720:720:0/aW1hZ2UvcHJvZHVjdC8yZTdkNzZlZS1lNjRkLTQ1YWMtYmI3MC0yZWY5MGZkMzVjYmMuanBlZw",
    tag: "Cowboy",
  },
  {
    id: 2,
    name: "Fairy Costume",
    href: "#",
    imageSrc:
      "https://images1.vinted.net/t/01_00e2f_3VtNiLoFd6iQbzDKPheUqZsX/f800/1668927158.jpeg?s=f1de2fa266d24ce5744857d66b167b5ec541e6a7",
    tag: "Fairy",
  },
  {
    id: 3,
    name: "Bald Mask",
    href: "#",
    imageSrc: "https://m.media-amazon.com/images/I/61CiEy804cL._AC_SL1500_.jpg",
    tag: "Baldy",
  },
  {
    id: 4,
    name: "Spiderman Costume",
    href: "#",
    imageSrc:
      "https://da1urhpfd469z.cloudfront.net/uploads/advertphotos/21/1023/46416668-971-640x1028.jpg",
    tag: "Superhero",
  },
  {
    id: 1,
    name: "Cowboy Hat",
    href: "#",
    imageSrc:
      "https://d3kbgunirza9ax.cloudfront.net/8BHR3LYrGqw/f:jpg/c:3024:3024:nowe:0:504/rs:fill:720:720:0/aW1hZ2UvcHJvZHVjdC8yZTdkNzZlZS1lNjRkLTQ1YWMtYmI3MC0yZWY5MGZkMzVjYmMuanBlZw",
    tag: "Cowboy",
  },
  {
    id: 2,
    name: "Fairy Costume",
    href: "#",
    imageSrc:
      "https://images1.vinted.net/t/01_00e2f_3VtNiLoFd6iQbzDKPheUqZsX/f800/1668927158.jpeg?s=f1de2fa266d24ce5744857d66b167b5ec541e6a7",
    tag: "Fairy",
  },
  {
    id: 3,
    name: "Bald Mask",
    href: "#",
    imageSrc: "https://m.media-amazon.com/images/I/61CiEy804cL._AC_SL1500_.jpg",
    tag: "Baldy",
  },
  {
    id: 4,
    name: "Spiderman Costume",
    href: "#",
    imageSrc:
      "https://da1urhpfd469z.cloudfront.net/uploads/advertphotos/21/1023/46416668-971-640x1028.jpg",
    tag: "Superhero",
  },
  // More products...
];

function Marketplace() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Itemtile
              id={product.id}
              name={product.name}
              href={product.href}
              imageSrc={product.imageSrc}
              tag={"#" + product.tag}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
