import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { registrationUrl } from '../environment';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPswd] = useState('');
  const [error,setError] = useState(false);
  const [errMsg,setErrMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
      e.preventDefault();
      setError(false);
      try {
        const response = await axios.post(registrationUrl, { email, password,confirmPassword });
        console.log(response.data); // Handle the response as needed
        if(response.status==201){
          navigate('/login');
        }
      } catch (error) {
        setError(true);
        let resp = error.response.data;
        setErrMsg(resp.message);
        console.log(error.response.data); // Handle the error response
      }
    };
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                   Sign Up
                </h1>
                <form className="mt-6" onSubmit={()=>handleSubmit}>
                {
                error && 
                (
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong class="font-bold">Oops!</strong>
                        <span class="block sm:inline">{errMsg}</span>
                        
                    </div>
                )
            }
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                           confirm Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e) => setConfirmPswd(e.target.value)}
                        />
                    </div>
                  
                    <div className="mt-6">
                        <button 
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                        >
                            Register
                        </button>
                    </div>
                    <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                   Already having account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Log in
                    </Link>
                </p>
                </form>

              
            </div>
        </div>
    );
}