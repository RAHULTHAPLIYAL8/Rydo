import React from 'react'
import uberLogo from "../assets/uberlogo.png"
import { Link,useNavigate} from 'react-router-dom'
import {UserDataContext} from '../context/UserContext'
import { useState } from 'react'
import axios from "axios"

const UserLogin = () => { 
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [userData,setUserData]=useState({});
  const {user,setUser}=React.useContext(UserDataContext);
  const navigate=useNavigate();
  const submitHandler=async (e)=>
  {
    e.preventDefault();
     
    const userData={
      email:email,
      password:password
    }

    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData);
    try{
      if(response.status===200)
      {
         console.log(response)
         const data=response.data;
         setUser(data.user);
         localStorage.setItem('token',data.token);
         navigate('/home')
      }}catch(error)
      {
        console.log(error.response.data);
       }

    setEmail('');
    setPassword('');
  }
  return (
    <>
      <div className="min-h-screen p-7 flex flex-col justify-between">
        <img className="w-20 mb-8" src={uberLogo} alt="" />
        <div>
        <form onSubmit={submitHandler}>
           <h3 className='text-xl mb-2 font-bold'>What's your email</h3>
           <input
            className='bg-[#ebebeb] rounded px-4 py-2 w-full text-lg mb-7 placeholder:text-base' 
            required  
            value={email}
            onChange={(e)=>
            {
                setEmail(e.target.value);
            }
            }
            type="email" 
            placeholder='email@example.com'
            />
           <h3 className='text-xl mb-2 font-bold' >Enter your Password</h3>
           <input 
           className='bg-[#ebebeb] rounded px-2 py-2 w-full text-lg mb-7 placeholder:text-base'
           required 
           value={password}
           onChange={(e)=>
           {
               setPassword(e.target.value);
           }
           }
           type="password"  
           placeholder='Enter your password'/>
           <button className='bg-[#111] text-white font-semibold rounded px-2 py-2 w-full text-lg mb-7'>Login</button>
        </form>
        <p className='text-center  mb-7'>New here ?<Link to="/signup" className='text-blue-700'>Create New Account</Link></p>
        </div>
        <div>
        <Link to="/captain-login" className='bg-[#10b641] text-white flex items-center justify-center font-semibold  rounded px-4 py-2 w-full text-lg mb-7'>Login as Captain</Link>
    </div>
    </div>
    </>
  )
}

export default UserLogin