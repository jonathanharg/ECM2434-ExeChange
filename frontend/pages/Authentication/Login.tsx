import React, { useState, useEffect } from "react";
import axios from "axios";

import { z, ZodError } from "zod";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
import { ArrowPathIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Login() {
  //react-auth-kit functions
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const [loggedIn, setLogIn] = useState(false);

  //react routing
  const navigate = useNavigate();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    if(isAuthenticated()) {
      navigate("/");
    }
  }

  //user, password, and error states that are updated when user types in anything
  //https://reactjs.org/docs/hooks-state.html
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");

  const emailSchema = z.string().email();
  const passwordSchema = z.string().min(8);

  var emailcheck = emailSchema.safeParse(user);
  var passwordcheck = passwordSchema.safeParse(password);

  useEffect(() => {
    if (!emailcheck.success && user) {
      setEmailErr("Invalid email");
    } else {
      setEmailErr("");
    }
  }, [user]);
  useEffect(() => {
    if (!passwordcheck.success && password) {
      setPassErr("Invalid password");
    } else {
      setPassErr("");
    }
  }, [password]);

  const handlesubmit = async (e) => {
    // this function sends form data to /api/login
    // Zod validation for email, password, and password matching
    //https://zod.dev/
    e.preventDefault();

    const emailSchema = z.string().email().endsWith("@exeter.ac.uk");
    const passwordSchema = z.string();

    var emailcheck = emailSchema.safeParse(user);
    var passwordcheck = passwordSchema.safeParse(password);

    // currently used for the generic error message on login failure

    if (!emailcheck.success || !passwordcheck.success) {
      setEmailErr("exists");
    }

    if (emailcheck.success && passwordcheck.success) {
      const response = await axios
        .post("/api/login", JSON.stringify({ user, password }), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then(function (response) {
          /*This is where the react-auth-kit can be set up, when it works, at the moment it is erroring*/
          if (response.data.status == "OK") {
            if (
              signIn({
                token: response.data.access,
                expiresIn: 5,
                tokenType: "Bearer",
                authState: { user: response.data.username }, // state passed in cannot be called user, hence const email = user.
                // refreshToken: response.data.refresh, // TODO: refreshToken working
                // refreshTokenExpireIn: 1440,
              })
            ) {
              //Logged in !
              console.log("USER LOGGED IN!");
              navigate("/");
            } else {
              //Throw error as react-auth-kit broke!
              console.log("oopsy :O");
            }
          } else {
            //Sign in was bad
            console.log("USERNAME OR PASSWORD WRONG!");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      setEmailErr("");
      setPassErr("");
      setUser("");
      setPassword("");
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {/* <img
              className="animate-slow mx-auto h-16 w-16 fill-green-800"
              // src={logo}
              alt="ExeChange Logo"
            /> */}
          </div>
          <div>
            <h2 className="mt-6 text-center text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              Log in
            </h2>
          </div>
          <form method="POST" onSubmit={handlesubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className={
                  emailErr
                    ? "mb-2 block text-sm font-medium text-red-700 dark:text-red-500"
                    : "mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                }
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className={
                  emailErr
                    ? "block w-full rounded-lg border border-red-500 bg-red-50 p-2.5 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500"
                    : "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                }
                placeholder="you@exeter.ac.uk"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
              <p
                className={
                  emailErr
                    ? "mt-2 text-sm text-red-600 dark:text-red-500"
                    : "visibility: none"
                }
              >
                {emailErr}
              </p>
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className={
                  passErr
                    ? "mb-2 block text-sm font-medium text-red-700 dark:text-red-500"
                    : "mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                }
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className={
                  passErr
                    ? "block w-full rounded-lg border border-red-500 bg-red-50 p-2.5 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500"
                    : "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                }
                placeholder="•••••••••"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <p
                className={
                  passErr
                    ? "mt-2 text-sm text-red-600 dark:text-red-500"
                    : "visibility: none"
                }
              >
                {passErr}
              </p>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-800 focus:ring-green-700"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-green-800 hover:text-green-700"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-800 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 stroke-white group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
