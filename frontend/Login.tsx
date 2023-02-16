import React, {useState, useEffect} from "react";
import axios from "axios";
import logo from "./logo.svg";
import {z, ZodError} from "zod";

axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = "csrftoken"
//import { LockClosedIcon } from '@heroicons/react/20/solid'



export default function Login() {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState(false);

  const handlesubmit = async (e: React.ChangeEvent<HTMLInputElement>) => { // this function sends form data to /api/login 
    e.preventDefault();

    const emailSchema = z.string().email().endsWith("@exeter.ac.uk");
    const passwordSchema = z.string();
    try{
      var emailcheck = emailSchema.parse(user);
      var passwordcheck = passwordSchema.parse(password);
    } catch (err) {
      setErr(err.message);
      console.log(err);
      return;
    }

    const response = await axios.post('/api/login', JSON.stringify({user, password}), 
    {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    setUser('');
    setPassword('');
    setSuccess(true);
  }
  
  
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-16 w-16 fill-green-800"
              src={logo}
              alt="ExeChange Logo"
            />
          </div>
          {success ? 
          <div>
            <h2 className="mt-6 text-center text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
                Welcome!
            </h2>
          </div> :
          <><div>
              <h2 className="mt-6 text-center text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
                Log in
              </h2>
            </div>
            <div className={err ? "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" : "visibility: hidden"} role="alert">
                <strong className="font-bold"> Error! </strong>
                <span className="block sm:inline"> Incorrect username or password. </span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
              </div>
              <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handlesubmit}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      you@exeter.ac.uk
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-800 focus:outline-none focus:ring-green-800 sm:text-sm"
                      placeholder="you@exeter.ac.uk"
                      onChange={(e) => setUser(e.target.value)}
                      value={user} />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-800 focus:outline-none focus:ring-green-800 sm:text-sm"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-green-800 focus:ring-green-700" />
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
                      {/* <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" /> */}
                    </span>
                    Log in
                  </button>
                </div>
              </form></>}
        </div>
      </div>
    </>
  );
}
