import React from "react";
import {ChatBubbleLeftRightIcon, PowerIcon, CameraIcon, UserGroupIcon, BookOpenIcon, CloudIcon,
        DocumentChartBarIcon, BuildingLibraryIcon, RocketLaunchIcon, NewspaperIcon, EyeDropperIcon,
        FilmIcon, MoonIcon, BeakerIcon, LightBulbIcon} from "@heroicons/react/24/outline";

function Profile(){

    const levelPercent = 55;
    const name = 'David';
    const level = 5;

    return(
        <><div className="min-h-screen flex flex-col max-w-lg lg:max-w-5xl mx-auto bg-white opacity-100 font-poppins px-4 bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between px-1 pt-4 items-center">
                <div>
                    <p className="font-semibold">My Profile</p>
                </div>
            </div>
            <div className="flex items-center px-4 pt-12 justify-between">
                <div className="w-24 h-24 bg-blue-600 flex items-center rounded-full">
                    {/* <img className="h-20 w-20 mx-auto" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png">
                    </img> */}
                </div>
                <div className="w-9/12 flex items-center">
                    <div className="w-10/12 flex flex-col leading-none pl-4">
                        <p className="text-2xl font-bold">{name}</p>
                        <p className="text-sm pt-1 font-light text-gray-700">Level {level}</p>
                        <div className="mb-1 text-base font-medium text-green-700 dark:text-green-500"></div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                        <div className="bg-green-600 h-2.5 rounded-full dark:bg-green-500" style={{width: levelPercent+ '%'}}></div>
                        </div>
                    </div>
                    <div className="w-2/12">
                        <div>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M9.243 19H21v2H3v-4.243l9.9-9.9 4.242 4.244L9.242 19zm5.07-13.556l2.122-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z" /></svg> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-12 px-4 w-full flex flex-col">
                <p className="font-semibold text-gray-600">My Achievements</p>
                <div className="flex w-full pt-2 space-x-2">
                    <button className="bg-gray-800 w-32 rounded-full px-4 py-2 font-ligth text-white flex">5 days in a row</button>
                    <button className="bg-green-800 w-32 rounded-full px-4 py-2 font-ligth text-white flex">Halloween trader</button>
                    <button className="bg-red-800 w-32 rounded-full px-4 py-2 font-ligth text-white flex">5+ trades</button>
                </div>
            </div>
            <div className="pt-12 px-4 w-full flex flex-col">
                <p className="font-semibold text-gray-600">Location Badges</p>
                <div className="flex flex-col w-full pt-2 space-y-2">
                    <div className="flex w-full h-12">
                    <div className="w-2/12 h-full">
                    <div className="h-12 w-12 bg-yellow-400 rounded-full flex items-center">
                        <UserGroupIcon className="stroke-white stroke-[1.9]" />
                    </div>
                    </div>
                        <div className="w-6/12 h-full flex items-start">
                            <p className="my-auto text-lg font-semibold">Lafrowda</p>
                        </div>
                        <div className="w-4/12 h-full flex justify-end items-end">
                            <button className="flex bg-red-600 rounded-md my-auto px-5 py-1 float-right text-white font-medium">3 Trades</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full pt-2 space-y-2">
                    <div className="flex w-full h-12">
                    <div className="w-2/12 h-full">
                    <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center">
                        <BookOpenIcon className="stroke-white stroke-[1.9]" />
                    </div>
                    </div>
                        <div className="w-6/12 h-full flex items-start">
                            <p className="my-auto text-lg font-semibold">Library</p>
                        </div>
                        <div className="w-4/12 h-full flex justify-end items-end">
                            <button className="flex bg-red-600 rounded-md my-auto px-5 py-1 float-right text-white font-medium">3 Trades</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full pt-2 space-y-2">
                    <div className="flex w-full h-12">
                        <div className="w-2/12 h-full">
                        <div className="w-2/12 h-full">
                        <div className="h-12 w-12 bg-orange-600 rounded-full flex items-center">
                            <CameraIcon className="stroke-white stroke-[1.9]" />
                        </div>
                        </div>
                        </div>
                        <div className="w-6/12 h-full flex items-start">
                            <p className="my-auto text-lg font-semibold">Holland Hall</p>
                        </div>
                        <div className="w-4/12 h-full flex justify-end items-end">
                            <button className="flex bg-red-600 rounded-md my-auto px-5 py-1 float-right text-white font-medium">3 Trades</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full pt-2 space-y-2">
                    <div className="flex w-full h-12">
                    <div className="w-2/12 h-full">
                    <div className="h-12 w-12 bg-purple-500 rounded-full flex items-center">
                        <PowerIcon className="stroke-white stroke-[1.9]" />
                    </div>
                    </div>
                        <div className="w-6/12 h-full flex items-start">
                            <p className="my-auto text-lg font-semibold">Sports Park</p>
                        </div>
                        <div className="w-4/12 h-full flex justify-end items-end">
                            <button className="flex bg-red-600 rounded-md my-auto px-5 py-1 float-right text-white font-medium">3 Trades</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full pt-2 space-y-2">
                    <div className="flex w-full h-12">
                    <div className="w-2/12 h-full">
                    <div className="h-12 w-12 bg-green-900 rounded-full flex items-center">
                        <ChatBubbleLeftRightIcon className="stroke-white stroke-[1.9]" />
                    </div>
                    </div>
                        <div className="w-6/12 h-full flex items-start">
                            <p className="my-auto text-lg font-semibold">Forum</p>
                        </div>
                        <div className="w-4/12 h-full flex justify-end items-end">
                            <button className="flex bg-red-600 rounded-md my-auto px-5 py-1 float-right text-white font-medium">3 Trades</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full pt-2 space-y-2">
                    <div className="flex w-full h-12">
                    <div className="w-2/12 h-full">
                    <div className="h-12 w-12 bg-pink-600 rounded-full flex items-center">
                        <CloudIcon className="stroke-white stroke-[1.9]" />
                    </div>
                    </div>
                        <div className="w-6/12 h-full flex items-start">
                            <p className="my-auto text-lg font-semibold">Mardon</p>
                        </div>
                        <div className="w-4/12 h-full flex justify-end items-end">
                            <button className="flex bg-red-600 rounded-md my-auto px-5 py-1 float-right text-white font-medium">3 Trades</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full pt-2 space-y-2">
                    <div className="flex w-full h-12">
                    <div className="w-2/12 h-full">
                    <div className="h-12 w-12 bg-blue-700 rounded-full flex items-center">
                        <DocumentChartBarIcon className="stroke-white stroke-[1.9]" />
                    </div>
                    </div>
                        <div className="w-6/12 h-full flex items-start">
                            <p className="my-auto text-lg font-semibold">Peter Chalk</p>
                        </div>
                        <div className="w-4/12 h-full flex justify-end items-end">
                            <button className="flex bg-red-600 rounded-md my-auto px-5 py-1 float-right text-white font-medium">3 Trades</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full pt-2 space-y-2">
                    <div className="flex w-full h-12">
                    <div className="w-2/12 h-full">
                    <div className="h-12 w-12 bg-gray-600 rounded-full flex items-center">
                        <BuildingLibraryIcon className="stroke-white stroke-[1.9]" />
                    </div>
                    </div>
                        <div className="w-6/12 h-full flex items-start">
                            <p className="my-auto text-lg font-semibold">Reed Hall</p>
                        </div>
                        <div className="w-4/12 h-full flex justify-end items-end">
                            <button className="flex bg-red-600 rounded-md my-auto px-5 py-1 float-right text-white font-medium">3 Trades</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full pt-2 space-y-2">
                    <div className="flex w-full h-12">
                    <div className="w-2/12 h-full">
                    <div className="h-12 w-12 bg-red-500 rounded-full flex items-center">
                        <RocketLaunchIcon className="stroke-white stroke-[1.9]" />
                    </div>
                    </div>
                        <div className="w-6/12 h-full flex items-start">
                            <p className="my-auto text-lg font-semibold">Physics Building</p>
                        </div>
                        <div className="w-4/12 h-full flex justify-end items-end">
                            <button className="flex bg-red-600 rounded-md my-auto px-5 py-1 float-right text-white font-medium">3 Trades</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full pt-2 space-y-2">
                    <div className="flex w-full h-12">
                    <div className="w-2/12 h-full">
                    <div className="h-12 w-12 bg-teal-600 rounded-full flex items-center">
                        <NewspaperIcon className="stroke-white stroke-[1.9]" />
                    </div>
                    </div>
                        <div className="w-6/12 h-full flex items-start">
                            <p className="my-auto text-lg font-semibold">Queen's</p>
                        </div>
                        <div className="w-4/12 h-full flex justify-end items-end">
                            <button className="flex bg-red-600 rounded-md my-auto px-5 py-1 float-right text-white font-medium">3 Trades</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full pt-2 space-y-2">
                    <div className="flex w-full h-12">
                    <div className="w-2/12 h-full">
                    <div className="h-12 w-12 bg-teal-900 rounded-full flex items-center">
                        <MoonIcon className="stroke-white stroke-[1.9]" />
                    </div>
                    </div>
                        <div className="w-6/12 h-full flex items-start">
                            <p className="my-auto text-lg font-semibold">Washington Singer</p>
                        </div>
                        <div className="w-4/12 h-full flex justify-end items-end">
                            <button className="flex bg-red-600 rounded-md my-auto px-5 py-1 float-right text-white font-medium">3 Trades</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full pt-2 space-y-2">
                    <div className="flex w-full h-12">
                    <div className="w-2/12 h-full">
                    <div className="h-12 w-12 bg-orange-800 rounded-full flex items-center">
                        <FilmIcon className="stroke-white stroke-[1.9]" />
                    </div>
                    </div>
                        <div className="w-6/12 h-full flex items-start">
                            <p className="my-auto text-lg font-semibold">Old Library</p>
                        </div>
                        <div className="w-4/12 h-full flex justify-end items-end">
                            <button className="flex bg-red-600 rounded-md my-auto px-5 py-1 float-right text-white font-medium">3 Trades</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full pt-2 space-y-2">
                    <div className="flex w-full h-12">
                    <div className="w-2/12 h-full">
                    <div className="h-12 w-12 bg-pink-700 rounded-full flex items-center">
                        <BeakerIcon className="stroke-white stroke-[1.9]" />
                    </div>
                    </div>
                        <div className="w-6/12 h-full flex items-start">
                            <p className="my-auto text-lg font-semibold">Amory</p>
                        </div>
                        <div className="w-4/12 h-full flex justify-end items-end">
                            <button className="flex bg-red-600 rounded-md my-auto px-5 py-1 float-right text-white font-medium">3 Trades</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full pt-2 space-y-2">
                    <div className="flex w-full h-12">
                    <div className="w-2/12 h-full">
                    <div className="h-12 w-12 bg-yellow-600 rounded-full flex items-center">
                        <LightBulbIcon className="stroke-white stroke-[1.9]" />
                    </div>
                    </div>
                        <div className="w-6/12 h-full flex items-start">
                            <p className="my-auto text-lg font-semibold">Innovation Centre</p>
                        </div>
                        <div className="w-4/12 h-full flex justify-end items-end">
                            <button className="flex bg-red-600 rounded-md my-auto px-5 py-1 float-right text-white font-medium">3 Trades</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full pt-2 space-y-2">
                    <div className="flex w-full h-12">
                        <div className="w-2/12 h-full">
                            <div className="h-12 w-12 bg-purple-900 rounded-full flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="white" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                            </svg>
                            </div>
                        </div>
                        <div className="w-6/12 h-full flex items-start">
                            <p className="my-auto text-lg font-semibold">Northcott Theatre</p>
                        </div>
                        <div className="w-4/12 h-full flex justify-end items-end">
                            <button className="flex bg-red-600 rounded-md my-auto px-5 py-1 float-right text-white font-medium">3 Trades</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full pt-2 space-y-2">
                    <div className="flex w-full h-12">
                        <div className="w-2/12 h-full">
                            <div className="h-12 w-12 bg-green-600 rounded-full flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="white" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                            </svg>
                            </div>
                        </div>
                        <div className="w-6/12 h-full flex items-start">
                            <p className="my-auto text-lg font-semibold">East park</p>
                        </div>
                        <div className="w-4/12 h-full flex justify-end items-end">
                            <button className="flex bg-red-600 rounded-md my-auto px-5 py-1 float-right text-white font-medium">2 Trades</button>
                        </div>
                    </div>
                </div>
                
            </div>
            
        </div></>
    );
}


export default Profile;
