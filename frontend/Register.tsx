import axios from "axios";
import React, { useState, useEffect} from "react";
import logo from "./logo.svg";


const USER_REGEX = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'); //email constraint
const PWD_REGEX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

function Register(){
    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);
    
    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    

    const [confirmPwd, setConfirmPwd] = useState('');
    const [validCPwd, setvalidCpwd] = useState(false);
   
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(()=> {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidUser(result);
    }, [user])

    useEffect(()=> {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPwd(result);
        const validP = password === confirmPwd;
        setvalidCpwd(validP)
        console.log(validP);
    }, [password, confirmPwd])

    useEffect(() => {setErr(''), [user, password, confirmPwd] }); // clear error msg if user starts typing

    let scheme = false;                         //this is for alternating button styles on disable
    const btnTheme= ()=> {   
    if (!validUser|| !validPwd || !validCPwd) {
        scheme = true; 
    }
    return scheme;
    }

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

                <div className={err ? "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" : "visibility: hidden"} role="alert">
                    <strong className="font-bold"> Error! </strong>
                    <span className="block sm:inline"> {err} </span>
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
                            value={user}
                            />
                            <div className={!validUser && user ? "bg-lime-100 border-t border-b border-lime-900 text-stone-700 px-4 py-3":"visibility: hidden"} role="alert">
                                <p className="font-bold">Info</p>
                                <p className="text-sm">Email address must be a valid Exeter University email! </p>
                            </div>
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
                            <div className={!validPwd && password ? "bg-lime-100 border-t border-b border-lime-900 text-stone-700 px-4 py-3":"visibility: hidden"} role="alert">
                                <p className="font-bold">Info</p>
                                <p className="text-sm"> Your password must have 8 or more characters. 
                                    It must contain numbers and lowercase, uppercase, and special characters.  </p>
                            </div>
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
                            <div className={!validCPwd && confirmPwd && password ? "bg-lime-100 border-t border-b border-lime-900 text-stone-700 px-4 py-3":"visibility: hidden"} role="alert">
                                <p className="font-bold">Info</p>
                                <p className="text-sm"> Your passwords must match. </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button disabled = {!validUser|| !validPwd || !validCPwd ? true: false} 
                            className= { btnTheme() ?" group relative flex w-full justify-center rounded-md border border-transparent bg-green-800 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2 opacity-50 cursor-not-allowed" : "group relative flex w-full justify-center rounded-md border border-transparent bg-green-800 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2"
    }>
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