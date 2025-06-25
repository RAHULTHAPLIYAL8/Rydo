import React from "react";
import uberLogo from "../assets/uberlogo.png";
import {UserDataContext} from '../context/UserContext'
import { Link ,useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";



const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});
  const navigate=useNavigate();
  const {user,setUser}=React.useContext(UserDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser= {
      fullname: {
        firstname:firstName,
        lastname:lastName,
      },
      email:email,
      password:password,
    };
    const url=`${import.meta.env.VITE_BASE_URL}/users/register`;
    const response=await axios.post(url,newUser);
    try{
    if(response.status===201)
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
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="min-h-screen p-7 flex flex-col justify-between">
        <img className="w-20 mb-8" src={uberLogo} alt="" />
        <div>
          <form onSubmit={submitHandler}>
            <h3 className="text-xl mb-2 font-bold">What's your Name</h3>
            <div className="flex gap-2">
              <input
                className="bg-[#ebebeb] rounded px-4 py-2 w-1/2 text-base mb-7 placeholder:text-sm"
                required
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                type="text"
                placeholder="Firstname"
              />
              <input
                className="bg-[#ebebeb] rounded px-4 py-2 w-1/2 text-base mb-7 placeholder:text-sm"
                required
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                type="text"
                placeholder="Lastname"
              />
            </div>
            <h3 className="text-xl mb-2 font-bold">What's your email</h3>
            <input
              className="bg-[#ebebeb] rounded px-4 py-2 w-full text-base mb-7 placeholder:text-sm"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="email@example.com"
            />
            <h3 className="text-xl mb-2 font-bold">Enter your Password</h3>
            <input
              className="bg-[#ebebeb] rounded px-2 py-2 w-full text-base mb-7 placeholder:text-sm"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter your password"
            />
            <button className="bg-[#111] text-white font-semibold rounded px-2 py-2 w-full text-lg mb-7">
              Create Account
            </button>
          </form>
          <p className="text-center  mb-7">
            Already have an account?
            <Link to="/login" className="text-blue-700">
              Login
            </Link>
          </p>
        </div>
        <div>
          <p className="text-slate-500 text-[12px] leading-tight">
            By proceeding , you consent to get calls, Whatsapp or Sms,
            messages,inculde by automated means, from uber and affilitate to the
            number provided
          </p>
        </div>
      </div>
    </>
  );
};

export default UserSignup;
