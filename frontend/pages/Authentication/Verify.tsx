import React, { useState } from "react";
import axios from "axios";

function Verify() {
    const queryParameters = new URLSearchParams(window.location.search);

    const username = queryParameters.get("username");
    const code = queryParameters.get("code");

    const [isVerified, setIsVerified] = useState(false);


    axios.post("/api/verify", JSON.stringify({username, code}), {headers: {"Content-Type": "application/json"}, withCredentials: true,})
    .then(function (response) {
        if(response.data.status != "OK") {
            setIsVerified(false);
            return;
        }
        setIsVerified(true);
    })
    return (
        <div>
            {
                isVerified
                ?
                <div>
                    <h1>VERIFIED</h1>
                    <p>Welcome to the change... you now have full access.</p>
                </div>
                :
                <div>
                    <h1>VERIFICATION ERROR</h1>
                    <p>Please try again, you will be late to the wave otherwise...</p>
                </div>
            }
        </div>
    )
};

export default Verify;