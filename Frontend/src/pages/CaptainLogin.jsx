import React from 'react'
import uberDriverLogo from "../assets/uberDriverlogo.png"
import { Link,useNavigate} from 'react-router-dom'
import { useState,useContext} from 'react'
import { CaptainDataContext } from "../context/CaptainContext";
import axios from 'axios'

const UserLogin = () => { 
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const {captain,setCaptain}=useContext(CaptainDataContext);
  const navigate=useNavigate();
  // const [captainData,setCaptainData]=useState({});
  const submitHandler=async(e)=>
  {
    e.preventDefault();
    const captainData={
        email:email,
        password:password
    };
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`,captainData);
    if(response.status===200)
    {
      const data=response.data;
      setCaptain(data.captain);
      localStorage.setItem('token',data.token);
      navigate('/captain-home')
    }
    // console.log(captainData);
    setEmail('');
    setPassword('');
  }
  return (
    <>
      <div className="min-h-screen p-7 flex flex-col justify-between">
        <img className="w-20 mb-8" src={uberDriverLogo} alt="" />
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
        <p className='text-center  mb-7'>Join a fleet?<Link to="/captain-signup" className='text-blue-700'>Register as a Captain</Link></p>
        </div>
        <div>
        <Link to="/login" className='bg-[#ff9a21] text-white flex items-center justify-center font-semibold  rounded px-4 py-2 w-full text-lg mb-7'>Login as User</Link>
    </div>
    </div>
    </>
  )
}

export default UserLogin