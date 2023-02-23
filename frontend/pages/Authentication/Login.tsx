import React, { useState, useEffect } from "react";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { LockClosedIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import z from "zod";
import { useNavigate } from "react-router-dom";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default function Login() {
  //react-auth-kit functions
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();

  //react routing
  const navigate = useNavigate();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    if (isAuthenticated()) {
      navigate("/");
    }
  }

  //user, password, and error states that are updated when user types in anything
  //https://reactjs.org/docs/hooks-state.html
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const emailSchema = z.string().email();
  const passwordSchema = z.string();

  const EmailValidation = emailSchema.safeParse(user);
  const PasswordValidation = passwordSchema.safeParse(password);

  useEffect(() => {
    if (!EmailValidation.success && user) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
  }, [user]);

  useEffect(() => {
    if (!PasswordValidation.success && password) {
      setPasswordError("Invalid password");
    } else {
      setPasswordError("");
    }
  }, [password]);

  const handleSubmit = async (e) => {
    // this function sends form data to /api/login
    // Zod validation for email, password, and password matching
    //https://zod.dev/
    e.preventDefault();

    if (!EmailValidation.success || !PasswordValidation.success) {
      return;
    }

    await axios
      .post("/api/login", JSON.stringify({ user, password }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        // TODO: Handle more responses than just OK
        if (response.data.status != "OK") {
          setEmailError("Incorrect username or password");
          setPasswordError("Incorrect username or password");
          console.log("Incorrect username or password!");
          return;
        }

        const attemptAuth = signIn({
          token: response.data.access,
          expiresIn: 120,
          tokenType: "Bearer",
          authState: { user: response.data.username }, // state passed in cannot be called user, hence const email = user.
          // refreshToken: response.data.refresh,
          // refreshTokenExpireIn: 1440,
        });

        if (attemptAuth) {
          console.log("User logged in!");
          navigate("/");
        } else {
          //Print error as react-auth-kit broke!
          console.log("React-auth-kit error!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <ArrowPathIcon className="animate-slow mx-auto h-16 w-16" />
          </div>
          <div>
            <h2 className="mt-6 text-center text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              Log in
            </h2>
          </div>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className={
                  emailError
                    ? "mb-2 block text-sm font-medium text-red-700 dark:text-red-500"
                    : "mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                }
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                // TODO: Format this with classname function
                className={
                  emailError
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
                  // TODO: Format with classname
                  emailError
                    ? "mt-2 text-sm text-red-600 dark:text-red-500"
                    : "visibility: none"
                }
              >
                {emailError}
              </p>
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className={
                  passwordError
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
                  passwordError
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
                  passwordError
                    ? "mt-2 text-sm text-red-600 dark:text-red-500"
                    : "visibility: none"
                }
              >
                {passwordError}
              </p>
            </div>
            <div className="-mt-2 mb-4 text-right text-sm">
              <a
                href="#"
                className="font-medium text-green-800 hover:text-green-700"
              >
                Forgot your password?
              </a>
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
