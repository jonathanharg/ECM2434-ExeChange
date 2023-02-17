import axios from "axios";
import React, { useState, useEffect} from "react";
import logo from "./logo.svg";
import { z } from "zod";

//General password rules.
const PWD_REGEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");

function Register(){
    const [user, setUser] = useState('');

    const [password, setPassword] = useState('');

    
    const [confirmPwd, setConfirmPwd] = useState('');
  
   
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState(false);
    
    const emailSchema = z.string().email().endsWith("@exeter.ac.uk");
    const passwordSchema = z.string().min(8).regex(PWD_REGEX);
    const passwordMatchSchema = z.object({
        password: z.string(), 
        confirmPwd: z.string()})

    // const passwordSchema = z.object({
    //     password: z.string(),
    //     confirmPwd: z.string()
    // })
    .refine((data) => data.password === data.confirmPwd);

    const passInfo = {
        password: password,
        confirmPwd: confirmPwd
    }
   
    var emailcheck = emailSchema.safeParse(user);
    var passwordcheck = passwordSchema.safeParse(password);
    var pwdMatchcheck = passwordMatchSchema.safeParse(passInfo);
    
    useEffect(() => {
        if (!emailcheck.success && user) {
            setErr("You need a valid University of Exeter email address to sign in.")
        } else { setErr('')}
        
    }, [user, password, confirmPwd]);

    useEffect(() => {
        if (!passwordcheck.success && emailcheck.success && password) {
            setErr("Your password must have 8 or more characters. It must contain numbers, lowercase, uppercase, and special characters.");
        } else { setErr('')}
    }, [password, confirmPwd]);

    useEffect(() => {
        if (!pwdMatchcheck.success && passwordcheck.success && confirmPwd) {
            setErr("Passwords must match.")
        } else { setErr('')}
    }, [confirmPwd]);

    //useEffect(() => {setErr(''), [user, password, confirmPwd] }); // clear error msg if user starts typing



    const handlesubmit = async (e) => { // this function sends form data to /api/register 

        e.preventDefault();

       

        if (emailcheck.success && passwordcheck.success && pwdMatchcheck.success) {
            const response = await axios.post('/api/register', JSON.stringify({user, password, confirmPwd}), 
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
            setErr('');
            setUser('');
            setPassword('');
            setConfirmPwd('');
            setSuccess(true);
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
                    Register
                </h2>
           
                <div className={err? "bg-teal-100 border-t-4 border-teal-500 rounded-b inset-x-0 top-0 absolute text-teal-900 px-4 py-3 shadow-md":"visibility: hidden"} role="alert">
                    <div className="flex">
                        <div className={err? "py-1": "visibility: hidden"}><svg className={err?"fill-current h-6 w-6 text-teal-500 mr-4":"visibility: hidden"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                        <div>
                        <p className={"font-bold"}>Info</p>
                        <p className="text-sm">{err}</p>
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
                            className= {" group relative flex w-full justify-center rounded-md border border-transparent bg-green-800 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2"   }>
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