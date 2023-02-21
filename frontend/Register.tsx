import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import logo from "./logo.svg";
import { boolean, z } from "zod";

//General password rules.
const PWD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
);

function Register() {
  //user, password, and error states that are updated when user types in anything
  //https://reactjs.org/docs/hooks-state.html
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPassword] = useState("");

  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [cPassErr, setcPassErr] = useState("");

  // Zod validation for email, password, and password matching
  const emailSchema = z.string().email().endsWith("@exeter.ac.uk");
  const passwordSchema = z.string().min(8).regex(PWD_REGEX);
  const passwordMatchSchema = z
    .object({
      password: z.string(),
      confirmPwd: z.string(),
    })

    .refine((data) => data.password === data.confirmPwd);

  const passInfo = {
    password: password,
    confirmPwd: confirmPwd,
  };
  // safeParse allows validation success to be checked easily and zod doesn't throw errors on failure
  // https://zod.dev/?id=safeparse
  var emailcheck = emailSchema.safeParse(email);
  var passwordcheck = passwordSchema.safeParse(password);
  var pwdMatchcheck = passwordMatchSchema.safeParse(passInfo);

  //Check user input and validate them
  useEffect(() => {
    if (!emailcheck.success && email) {
      setEmailErr(
        "You need a valid University of Exeter email address to sign in."
      );
    } else {
      setEmailErr("");
    }
  }, [email, password, confirmPwd]);
  useEffect(() => {
    if (!passwordcheck.success && password) {
      setPassErr(
        "Your password must have 8 or more characters. It must contain numbers, lowercase, uppercase, and special characters."
      );
    } else {
      setPassErr("");
    }
  }, [password, confirmPwd]);

  useEffect(() => {
    if (!pwdMatchcheck.success && confirmPwd) {
      setcPassErr("Passwords must match.");
    } else {
      setcPassErr("");
    }
  }, [confirmPwd]);

  const handlesubmit = async (e) => {
    // this function sends form data to /api/register

    e.preventDefault();

    if (emailcheck.success && passwordcheck.success && pwdMatchcheck.success) {
      //backend takes user as a JSON key, hence setting user to email and then passing user in below
      //JSON stringify.
      const user = email;
      const response = await axios
        .post("/api/register", JSON.stringify({ user, password, confirmPwd }), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      setEmailErr("");
      setPassErr("");
      setcPassErr("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="animate-slow mx-auto h-16 w-16 fill-green-800"
              src={logo}
              alt="ExeChange Logo"
            />
          </div>

          <div>
            <h2 className="mt-6 text-center text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              Register
            </h2>
            <form method="POST" onSubmit={handlesubmit}>
              <div>
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
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
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
                <div className="mb-6">
                  <label
                    htmlFor="confirm_password"
                    className={
                      cPassErr
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
                      cPassErr
                        ? "block w-full rounded-lg border border-red-500 bg-red-50 p-2.5 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500"
                        : "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    }
                    placeholder="•••••••••"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPwd}
                    required
                  />
                  <p
                    className={
                      cPassErr
                        ? "mt-2 text-sm text-red-600 dark:text-red-500"
                        : "visibility: none"
                    }
                  >
                    {cPassErr}
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
