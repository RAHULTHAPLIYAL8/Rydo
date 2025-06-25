import React, { useState,useRef } from 'react'
import uberLogo from "../assets/uberlogo.png"
import { Link,useLocation} from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import {useGSAP} from "@gsap/react"
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {
   
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(false);
  const Location=useLocation();
  const rideData=Location.state?.ride;

    useGSAP(()=>
    {
      if(finishRidePanel)
      {
      gsap.to(finishRidePanelRef.current,{translateY:"0%"});
      }else
      {
        gsap.to(finishRidePanelRef.current,{translateY:"100%"});
      }
    },[finishRidePanel]);


  return (
     <div className='h-screen relative flex flex-col justify-end'>
               <h5 className="p-1 pb-20 text-center w-[93%] absolute top-0 z-10">
               <i
               
                style={{ fontSize: "50px" }}
                className="p-20 text-gray-600 ri-arrow-drop-down-line"
               ></i>
              </h5>
              <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
              <img className='w-16' src={uberLogo} alt="" />
              <Link to="/captain-home" className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-logout-box-r-line"></i>
              </Link>
              </div>
             
              <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400'
              onClick={()=>{setFinishRidePanel(true)}}
              >
              <h5 className="p-1 pb-20 text-center w-[93%] absolute top-0 z-10">
               <i              
                style={{ fontSize: "24px" }}
                className="p-20 text-gray-600 ri-arrow-up-s-fill"
               ></i>
              </h5>
              <h4 className='text-xl font-semibold'>4km away</h4>
              <button  className=" flex justify-center w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"> Complete Ride</button>
              </div> 
             
             {/* Panel */}
              <div ref={ finishRidePanelRef} className='w-full fixed z-10 bottom-0 px-3 py-6 pt-12 translate-y-full bg-white'>
                   <FinishRide 
                   ride={rideData}
                   setFinishRidePanel={setFinishRidePanel}/>
               </div>

              <div className='h-screen fixed w-screen z-[-1]'>
                <LiveTracking/>
                {/* <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
              </div>
            </div>
  )
}

export default CaptainRiding