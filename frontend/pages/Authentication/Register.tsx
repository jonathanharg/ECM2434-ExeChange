import axios from "axios";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

// FIXME: Type invalid password -> confirm invalid password -> change invalid origin password to
// a valid password and confirm password will not error.

//Must be at least one lower case, one upper case, one special character, and one number
const PWD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
);

function Register() {
  // Needed for logging the user in once registered, and checking if logged in
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();

  // React router redirect
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [genericError, setGenericError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Zod validation for email, password, and password matching
  const emailSchema = z.string().email().endsWith("@exeter.ac.uk");
  const passwordSchema = z.string().min(8).regex(PWD_REGEX);
  const passwordsMatchSchema = z
    .object({
      password: z.string(),
      confirmPwd: z.string(),
    })

    .refine((data) => data.password === data.confirmPwd);

  const inputPasswords = {
    password: password,
    confirmPwd: confirmPassword,
  };
  // safeParse allows validation success to be checked easily and zod doesn't throw errors on failure
  // https://zod.dev/?id=safeparse
  const emailCheck = emailSchema.safeParse(email);
  const passwordCheck = passwordSchema.safeParse(password);
  const passwordsMatchCheck = passwordsMatchSchema.safeParse(inputPasswords);

  //Check user input and validate them
  useEffect(() => {
    if (!emailCheck.success && email) {
      setGenericError("");
      setEmailError(
        "You need a valid University of Exeter email address to sign in."
      );
    } else {
      setEmailError("");
    }
  }, [email, password, confirmPassword]);

  useEffect(() => {
    if (!passwordCheck.success && password) {
      setPasswordError(
        "Your password must have 8 or more characters. It must contain numbers, lowercase, uppercase, and special characters."
      );
    } else {
      setPasswordError("");
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (!passwordsMatchCheck.success && confirmPassword) {
      setConfirmPasswordError("Passwords must match.");
    } else {
      setConfirmPasswordError("");
    }
  }, [confirmPassword]);

  const handlesubmit = async (e) => {
    // this function sends form data to /api/register
    e.preventDefault();

    if (
      !emailCheck.success ||
      !passwordCheck.success ||
      !passwordsMatchCheck.success
    ) {
      return;
    }
    //backend takes user as a JSON key, hence setting user to email and then passing user in below
    //JSON stringify.
    const user = email;
    await axios
      .post(
        "/api/register",
        JSON.stringify({ user, password, confirmPwd: confirmPassword }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then(function (response) {
        // If response status UNIQUE_ERROR -> then show error message.
        if (response.data.status == "UNIQUE_ERROR") {
          console.log("You are already signed up!");
          setGenericError(
            // TODO: Link to Login Page
            "You seem to be already signed up!"
          );
          return;
        }
        if (response.data.status != "OK") {
          console.log("Auth error!");
          setGenericError("An unknown authentication error occurred!");
          return;
        }
        // SIGN UP WAS SUCCESSFUL -> proceed to 'sign the user in' by using the tokens returned to them
        // from the django register view !

        const attemptAuth = signIn({
          token: response.data.access,
          expiresIn: 120,
          tokenType: "bearer",
          authState: { user: response.data.username },
          // TODO: refresh tokens working !
        });
        if (attemptAuth) {
          //Registered user has been successfully signed in!
          console.log("User logged in!");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
              Register
            </h2>
          </div>
          <form method="POST" onSubmit={handlesubmit}>
            <div>
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
                  className={
                    // TODO: Format this with classname function
                    emailError
                      ? "block w-full rounded-lg border border-red-500 bg-red-50 p-2.5 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500"
                      : "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  }
                  placeholder="you@exeter.ac.uk"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <p
                  className={
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
              <div className="mb-6">
                <label
                  htmlFor="confirm_password"
                  className={
                    confirmPasswordError
                      ? "mb-2 block text-sm font-medium text-red-700 dark:text-red-500"
                      : "mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  }
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  className={
                    confirmPasswordError
                      ? "block w-full rounded-lg border border-red-500 bg-red-50 p-2.5 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500"
                      : "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  }
                  placeholder="•••••••••"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                />
                <p
                  className={
                    confirmPasswordError
                      ? "mt-2 text-sm text-red-600 dark:text-red-500"
                      : "visibility: none"
                  }
                >
                  {confirmPasswordError}
                </p>
              </div>
              <button
                className={
                  " group relative flex w-full justify-center rounded-md border border-transparent bg-green-800 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2"
                }
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Register
              </button>
              <br />
              <p
                className={
                  genericError
                    ? "mt-2 text-sm text-red-600 dark:text-red-500"
                    : "visibility: none"
                }
              >
                {genericError}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Register;
