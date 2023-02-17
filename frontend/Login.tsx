import React, {useState, useEffect} from "react";
import axios from "axios";
import logo from "./logo.svg";
import {z, ZodError} from "zod";

axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = "csrftoken"
//import { LockClosedIcon } from '@heroicons/react/20/solid'



export default function Login() {
  //user, password, and error states that are updated when user types in anything
  //https://reactjs.org/docs/hooks-state.html
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handlesubmit = async (e) => { // this function sends form data to /api/login 
    // Zod validation for email, password, and password matching
    //https://zod.dev/
    e.preventDefault();

    const emailSchema = z.string().email().endsWith("@exeter.ac.uk");
    const passwordSchema = z.string();

    var emailcheck = emailSchema.safeParse(user);
    var passwordcheck = passwordSchema.safeParse(password);

    // currently used for the generic error message on login failure

    if(!emailcheck.success || !passwordcheck.success){
      setErr('exists');
    }
  
    if(emailcheck.success && passwordcheck.success){
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
      setErr('')
      setUser('');
      setPassword('');
    }
  }
  
  
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
                Log in
              </h2>
            </div>
            <div className={err? "bg-teal-100 border-t-4 border-teal-500 rounded-b absolute inset-x-0 -top-8 text-teal-900 px-4 py-3 shadow-md":"visibility: hidden"} role="alert">
              <div className="flex">
                  <div className={err? "py-1": "visibility: hidden"}><svg className={err?"fill-current h-6 w-6 text-teal-500 mr-4":"visibility: hidden"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                  <div>
                  <p className={"font-bold"}>Info</p>
                  <p className="text-sm">We don't recognize that username or password. Don't have an account? 
                  <a href="/Register" className="font-bold text-gray-900 hover:underline"> Register Now!</a></p>
                  </div>
              </div>
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
              </form>
        </div>
      </div>
    </>
  );
}
