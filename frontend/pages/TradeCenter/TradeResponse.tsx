import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Product } from "../Marketplace/Itemtile";
import { TradeInvolvement } from "./TradeCenter";

export default function TradeResponse(trade: TradeInvolvement) {
    const [page, setPage] = useState<number>(0)
    const [products, setProducts] = useState<Product[]>([]);
    const [reciever_exchanging, setRecieverExchanging] = useState<Number[]>()

    function fetchProducts() {
        return fetch("/api/products")
        .then((response) => response.json())
        .then((data) => setProducts(data));
    }
    useEffect(()=> {fetchProducts()}, [])
    function handleclick() {
        console.log(products.map((i)=> i.owner.id))
        setPage(1)
        console.log(page)
    }
    
    function handleExtraItems(index) {
        if(reciever_exchanging){
            if (reciever_exchanging.includes(index)) {

            setRecieverExchanging(reciever_exchanging.filter((i) => i !== index));
            } else {
            setRecieverExchanging([...reciever_exchanging, index]);
            }
        }
      }

    function showSvg(index) {
        if(reciever_exchanging){
            if(reciever_exchanging.includes(index)) {    
            return <CheckCircleIcon className={`w-6 h-6 absolute right-0 stroke-green-800`}> </CheckCircleIcon>
            } 
        }
      }
    return (
        <div className="w-full"> 
            <div className={page == 0 ? "p-4 overflow-hidden flex flex-col items-center rounded-lg": "hidden"}>
                {trade.giver_giving.length == 1 ? 
                  <>
                    <h3 className="text-xl p-5 font-bold text-gray-900">
                    {" "}
                    {trade.receiver.username} wants the {trade.giver_giving.map((i) => i.caption)}{" "}
                    </h3> 
                    <div className="flex justify-center w-full p-2"> 
                    {trade.giver_giving.map((i) =>  
                    <div key= {i.id} className="w-1/4 font-bold text-gray-900 relative overflow-hidden rounded-lg hover:opacity-75">
                    <img
                    draggable={false}
                    tabIndex={1}
                    src={i.image}
                    />
                    </div>)

                    }   
                    </div>
                    <p className="text-sm pt-2 text-gray-500">   
                        <b> Message from {trade.receiver.username}: </b> {trade.message}  
                    </p> 
                </>
                : 
                <>
                    <h3 className="text-xl p-5 font-bold text-gray-900">
                    {" "}
                    {trade.receiver.username} wants the following items: {" "}
                    </h3>
                    <div className="p-4 container grid grid-flow-dense grid-cols-4 gap-2 rounded-md overflow-hidden mx-auto py-1"> 
                        {trade.giver_giving.map((i) =>  
                        <div key= {i.id} className="w-full text-sm font-bold text-gray-900 relative overflow-hidden rounded-lg hover:opacity-75">
                        <img
                        draggable={false}
                        tabIndex={1}
                        src={i.image}
                        />
                        </div>)}   
                    </div>
                    <p className="text-sm pt-2 text-gray-500">   
                        <b> Message from {trade.receiver.username}: </b> {trade.message}  
                    </p> 
                </>
                }  
                <div className="p-2 flex justify-center items-center">
                    <button onClick ={handleclick} className="w-fit flex items-center p-2 text-sm font-medium text-white bg-green-800 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                        Pick the Items you would like in exechange
                        <ArrowRightIcon className=" m-2 h-3 w-3"></ArrowRightIcon>
                    </button>
                </div>
            </div>
            <div className={page == 1 ? "p-4 overflow-hidden flex flex-col items-center rounded-lg": "hidden"}>

                {products.filter((i)=> i.owner.id == trade.receiver.id).length > 0 ? 
                  <>
                    <h3 className="text-xl p-5 font-bold text-gray-900">
                    {" "}
                    {trade.receiver.username} has the following item(s):{" "}
                    </h3> 
                    <div className="p-4 container grid grid-flow-dense grid-cols-4 gap-2 rounded-md overflow-hidden mx-auto py-1"> 
                        {products.filter(i=>i.owner.id==trade.receiver.id).map((i) =>  
                        <div key= {i.id} className="w-full relative overflow-hidden rounded-md bg-gray-200 hover:opacity-75">
                        {showSvg(i.id)}
                        <img
                        draggable={false}
                        tabIndex={1}
                        src={i.image}
                        onClick={() => handleExtraItems(i.id) }
                        />
                        </div>)}       
                    </div>
                    <p className="text-sm pt-2 text-gray-500">   
                        <b> Message from {trade.receiver.username}: </b> {trade.message}  
                    </p> 
                </>
                : 
                <>
                    <div className="flex justify-center items-center">
                        <h3 className="text-md font-bold text-gray-900">
                        {" "}
                            Looks like {trade.receiver.username} hasn't posted any items yet! 
                        {" "}
                        </h3>
                    </div>
                    <p className="text-sm pt-2 text-gray-500">   
                            <b> psst... </b> You can still give away your item
                    </p> 
                </>
                }  

                <div className="p-2 w-full grid grid-cols-3 ">
                    <div className="justify-left">
                        <button onClick ={handleclick} className="w-fit flex items-center p-2 text-sm font-medium text-white bg-red-800 border border-gray-300 rounded-lg hover:bg-red-700 hover:text-gray-700">
                            Decline
                            <TrashIcon className=" stroke-2 m-2 h-3 w-3"></TrashIcon>
                        </button>
                    </div>
                    <div className="justify-center"> </div>
                    <div className="justify-right">
                        <button onClick ={handleclick} className="w-fit flex items-center p-2 text-sm font-medium text-white bg-green-800 border border-gray-300 rounded-lg hover:bg-green-700 hover:text-gray-700">
                            Next
                            <ArrowRightIcon className="stroke-2 m-2 h-3 w-3"></ArrowRightIcon>
                        </button>
                    </div>
                </div>
            </div>
        </div>  
    )
}