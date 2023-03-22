import React, { useState } from "react";
import axios from "axios";

function ResendVerify() {
  const QueryParameters = new URLSearchParams(window.location.search);
  const username = QueryParameters.get("username");

  const [err, setErr] = useState(false);

  axios
    .post("/api/resendverify", JSON.stringify({ username }), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then(function (response) {
      if (response.data.status != "OK") {
        setErr(true);
        return;
      }
    });

  return (
    <div>
      {err ? (
        <div>
          <h1>ERROR</h1>
          <p>There was an error in resending the email please try again.</p>
          <p>If this error keeps persisting please contact support...</p>
        </div>
      ) : (
        <div>
          <h1>EMAIL RESENT</h1>
          <p>
            Email has been resent, please check your spam box if you cannot find
            it.
          </p>
          <p>We are worthy of your main inbox, we promise...</p>
        </div>
      )}
    </div>
  );
}
export default ResendVerify;
