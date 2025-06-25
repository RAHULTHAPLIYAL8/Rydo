import React, { useContext } from "react";
import uberLogo from "../assets/uberlogo.png";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});
  const [vehicleColor,setVehicleColor]=useState('');
  const [vehiclePlate,setVehiclePlate]=useState('');
  const [vehicleCapacity,setVehicleCapacity]=useState('');
  const [vehicleType,setVehicleType]=useState('');
  const navigate=useNavigate();
  const {captain,setCaptain}=useContext(CaptainDataContext);
  const submitHandler =async (e) => {
    e.preventDefault();

    const captainData= {
      fullname: {
        firstname:firstName,
        lastname:lastName,
      },
      email:email,
      password:password,
      vehicle:{
        color:vehicleColor,
        plate:vehiclePlate,
        capacity:vehicleCapacity,
        vehicleType:vehicleType
      }
    };

    // setUserData(dataToSubmit);
    console.log(captainData);

    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`,captainData);

    if(response.status===201)
    {
      const data=response.data;
      setCaptain(data.captain);
      localStorage.setItem('token',data.token);
      navigate('/captain-home')
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehicleCapacity("");
    setVehiclePlate("");
    setVehicleType("");
  };

  return (
    <>
      <div className="min-h-screen py-5 px-5 flex flex-col justify-between">
        
        <div>
        <img className="w-20 mb-8" src={uberLogo} alt="" />
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
            <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

            <button className="bg-[#111] text-white font-semibold rounded px-2 py-2 w-full text-lg mb-7">
               Create Captain Account
            </button>
          </form>
          <p className="text-center  mb-7">
            Already have an account?
            <Link to="/captain-login" className="text-blue-700">
              Login
            </Link>
          </p>
        </div>
        <div>
          <p className="text-slate-500 text-[12px] leading-tight">
            {/*leading-tight=>give line size between the sentence*/}
            By proceeding , you consent to get calls, Whatsapp or Sms,
            messages,inculde by automated means, from uber and affilitate to the
            number provided
          </p>
        </div>
      </div>
    </>
  );
};

export default CaptainSignup;
