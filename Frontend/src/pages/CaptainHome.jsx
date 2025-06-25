import React from 'react'
import {Link} from 'react-router-dom'
import uberLogo from "../assets/uberlogo.png"
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import {useGSAP} from "@gsap/react"
import gsap from 'gsap'
import { useState ,useRef,useEffect,useContext} from 'react'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import {SocketContext} from "../context/SocketContext";
import {CaptainDataContext} from '../context/CaptainContext'
import axios from "axios"

const CaptainHome = () => {
    const [ridePopupPanel, setridePopupPanel] = useState(false);
    const [ConfirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
    const ridePopupPanelRef = useRef(null)
    const ConfirmRidePopupPanelRef = useRef(null)
    const {socket}=useContext(SocketContext);
    const {captain}=useContext(CaptainDataContext);
    const [ride,setRide]=useState(null);


      useGSAP(()=>
        {
          if(ridePopupPanel)
          {
           gsap.to(ridePopupPanelRef.current,{translateY:"0%"})
          }else
          {
            gsap.to(ridePopupPanelRef.current,{translateY:"100%"})
          }
        },[ridePopupPanel])


      useGSAP(()=>
        {
          if(ConfirmRidePopupPanel)
          {
           gsap.to(ConfirmRidePopupPanelRef.current,{translateY:"0%"})
          }else
          {
            gsap.to(ConfirmRidePopupPanelRef.current,{translateY:"100%"})
          }
        },[ConfirmRidePopupPanel])


        useEffect(() => {
          
        if(!captain)
        {return;}
        console.log("Captain Socket id Function useeffect")
        socket.emit('join',{userType:'captain',userId:captain._id})
        console.log('rahul thapliya update location')
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    console.log(position);
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        // const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()
          
        }, [])

    socket.on('new-ride', (data) => {

        // setRide(data)
        console.log(data);
        setRide(data);
        setridePopupPanel(true)

    }) 


    //when Captain click on the Ride for confirmation
    async function confirmRide()
    {
      const response = await axios.post(
  `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
  {
    rideId: ride._id,
    captain: captain._id,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}` // Replace with your actual token
    }
  }
);

        setridePopupPanel(false);
        setConfirmRidePopupPanel(true);
    }
        

  return (
    <div className='h-screen'>
          <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
          <img className='w-16' src={uberLogo} alt="" />
          <Link to="/home" className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg font-medium ri-logout-box-r-line"></i>
          </Link>
          </div>
          <div className='h-3/5'>
            <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*gwMx05pqII5hbfmX.gif" alt="" />
          </div>
          <div className='h-2/5 p-6'>
           <CaptainDetails/>
          </div> 
          <div ref={ridePopupPanelRef} className='w-full fixed z-10  -translate-y-full bottom-0 px-3 py-10  pt-12  bg-white'>
              <RidePopUp 
              ride={ride}
              setConfirmRidePopupPanel={setConfirmRidePopupPanel} 
              setridePopupPanel={setridePopupPanel}
              confirmRide={confirmRide}
              />
              
          </div>
           <div ref={ConfirmRidePopupPanelRef} className='w-full h-screen fixed z-10  -translate-y-full bottom-0 px-3 py-10  pt-12  bg-white'>
              <ConfirmRidePopUp 
              ride={ride}
              setConfirmRidePopupPanel={setConfirmRidePopupPanel}  
              setridePopupPanel={setridePopupPanel}/>
          </div>
        </div>
  )
}

export default CaptainHome;