import React from 'react';


export default function Error (message:any) {

    return (
        <div className= {!message ?" hidden" : "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"} role="alert">
        <strong className="font-bold">Holy smokes!</strong>
        <span className="block sm:inline">{" "}{message}</span>
        </div>
  )
}