import axios from "axios";
import React, { useState } from "react";
import logo from "./logo.svg";

function Register(){
 
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState(false);

    const handlesubmit = async (e) => { // this function sends form data to /api/login 
        e.preventDefault();
        
        const response = await axios.post('/api/login', JSON.stringify({user, password, confirmPwd}), 
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
        setConfirmPwd('');
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

            <div>
                <h2 className="mt-6 text-center text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
                    Register
                </h2>
            
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
                            value={user}
                            />
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
                            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-800 focus:outline-none focus:ring-green-800 sm:text-sm"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                            Confirm Password
                            </label>
                            <input
                            id="repeatpassword"
                            name="repeatpassword"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-800 focus:outline-none focus:ring-green-800 sm:text-sm"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPwd(e.target.value)}
                            value={confirmPwd}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-800 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            </span>
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