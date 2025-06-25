import React,{useContext} from 'react'
import uberLogo from "../assets/uberlogo.png"
import trafficImage from "../assets/traficLight.jpg"
import { UserDataContext } from '../context/UserContext'
import { Link } from 'react-router-dom'

const Start = () => {
  const ans=useContext(UserDataContext);
  // console.log(ans);
  return (
    <div><div style={{ backgroundImage: `url(${trafficImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className='bg-[url({trafficImage})] h-screen pt-8  w-full flex justify-between flex-col'>
        <img className="w-15 ml-8" src={uberLogo} alt="" />
        <div className='bg-white py-4 px-4 pb-7'>
            <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
            <button className='w-full bg-black text-white py-3 roudend mt-4'><Link to="/login">Continue</Link></button>
        </div>
    </div></div>
  )
}

export default Start;