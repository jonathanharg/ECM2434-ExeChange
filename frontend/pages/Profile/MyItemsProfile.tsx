import React, { useEffect, useState } from "react";
import Itemtile, { Product } from "../Marketplace/Itemtile";
import { DeleteItem } from "./DeleteItem";

interface ProfileData {
    levelPercent: number;
    name: string;
    level: number;
  }

export function MyItems() {
    const [searchState, setSearchState] = useState(new Set<string>());
    const [products, setProducts] = useState<Product[]>([]);
    const [profileData, setProfileData] = useState<ProfileData>();

    function fetchProducts() {
        return fetch("/api/products")
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }

    function fetchProfileData() {
        return fetch("/api/profiledata")
            .then((response) => response.json())
            .then((data) => setProfileData(data));
    }

    function isSuperset(set, subset) {
        for (const elem of subset) {
            if (!set.has(elem)) {
                return false;
            }
        }
        return true;
    }

    useEffect(() => {
        fetchProducts();
        fetchProfileData();
    }, []);


    return (
        <>
        <p className="font-semibold text-gray-600">My Items</p>
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
                <>
                <div className="relative">
                    <Itemtile key={product.id} {...product} />
                    <div className="absolute top-0 bg-red-500 text-white p-2 rounded hover:bg-red-800">
                        <DeleteItem />
                    </div>
                </div>
                </>
                ))}
        </div>
        </>
    )
}

