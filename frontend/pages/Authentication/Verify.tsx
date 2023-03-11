import React, { useState } from "react";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function Verify() {
  const queryParameters = new URLSearchParams(window.location.search);

  const username = queryParameters.get("username");
  const code = queryParameters.get("code");

  const signIn = useSignIn();
  const navigate = useNavigate();

  const [isVerified, setIsVerified] = useState(false);
  const [alreadyVerified, setIsAlreadyVerified] = useState(false);

  function resendEmail() {
    navigate("/resendverify?username=" + username);
  }

  axios
    .post("/api/verify", JSON.stringify({ username, code }), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then(function (response) {
      if (response.data.status == "ALREADY_VERIFIED") {
        setIsAlreadyVerified(true);
        return;
      }
      if (response.data.status != "OK") {
        setIsVerified(false);
        return;
      }

      const attemptAuth = signIn({
        token: response.data.access,
        expiresIn: 120,
        tokenType: "bearer",
        authState: { user: response.data.username },
        // TODO: refresh tokens working !
      });

      if (attemptAuth) {
        //Registered user has been successfully verified !
        setIsVerified(true);

        // Wait for 3 seconds before redircting to home with auth now set.
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    });
  return (
    <div>
      {isVerified ? (
        <div>
          <h1>VERIFIED</h1>
          <p>Welcome to the change... you now have full access.</p>
          <p>You will be redirected in a matter of seconds...</p>
        </div>
      ) : alreadyVerified ? (
        <div>
          <h1>HUH? ALREADY VERIFIED</h1>
          <p>You can keep refreshing if you want though...</p>
        </div>
      ) : (
        <div>
          <h1>VERIFICATION ERROR</h1>
          <p>Please try again, you will be late to the wave otherwise...</p>
          <a onClick={() => resendEmail()} className="cursor-pointer">Click here to resend!</a>
        </div>
      )}
    </div>
  );
}

export default Verify;
