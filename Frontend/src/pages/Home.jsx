import React, { useState,useRef,useContext,useEffect} from 'react'
import uberLogo from "../assets/uberlogo.png"
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from "../components/VehiclePanel"
import ConfirmRide from "../components/ConfirmRide"
import LookingForDriver from "../components/LookingForDriver"
import WaitingForDriver from '../components/WaitingForDriver'
import axios from 'axios'
import {SocketContext} from "../context/SocketContext"
import {UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState("");
  const [fare, setFare] = useState("")
  const [vehicleType,setVehicleType] = useState(null);    // when we slect vehcile so vehicle name set in this state
   // "pickup" or "destination"

  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

   const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [ride,setRide]=useState()
  const navigate=useNavigate()

  const {socket}=useContext(SocketContext)
  const {user}=useContext(UserDataContext)

  
  useEffect(() => {
    if(!user)
      {return;
      }
     console.log("Rahul")
     console.log(user);
     socket.emit('join',{userType:'user',userId:user._id})
  }, [user])



  socket.on('ride-confirmed',ride=>
  {
    setRide(ride)
    setwaitingForDriver(true);
    setVehicleFound(false);
  }
  )


  socket.on('ride-started',ride=>
  {
    setwaitingForDriver(false);
    setVehicleFound(false);
    navigate("/riding",{state:{ride}})
  }
  )

  
  const submitHandler = (e) => {
    e.preventDefault();
  }
 
  useGSAP(() => {
    if(isPanelOpen){
      gsap.to(panelRef.current, { height:'70%' })
      gsap.to(panelCloseRef.current, { opacity:1 })
    } else {
      gsap.to(panelRef.current, { height:'0%' })
      gsap.to(panelCloseRef.current, { opacity:0 })
    }
  }, [isPanelOpen]);

  useGSAP(() => {
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current, { translateY:"0%" })
    } else {
      gsap.to(vehiclePanelRef.current, { translateY:"100%" })
    }
  }, [vehiclePanel])

  useGSAP(() => {
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current, { translateY:"0%" })
    } else {
      gsap.to(confirmRidePanelRef.current, { translateY:"100%" })
    }
  }, [confirmRidePanel])

  useGSAP(() => {
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current, { translateY:"0%" })
    } else {
      gsap.to(vehicleFoundRef.current, { translateY:"100%" })
    }
  }, [vehicleFound])

  useGSAP(() => {
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current, { translateY:"0%" })
    } else {
      gsap.to(waitingForDriverRef.current, { translateY:"100%" })
    }
  }, [waitingForDriver])

  // When a suggestion is clicked in LocationSearchPanel
  const handleSuggestionSelect = (suggestion) => {
    if(activeField === "pickup") {
      setPickup(suggestion);
    } else if(activeField === "destination") {
      setDestination(suggestion);
    }
    // setIsPanelOpen(false);
    setActiveField(""); // reset active field
  }

  const findTrip=async ()=>
  {
   setIsPanelOpen(false);
   setVehiclePanel(true);
   const response = await axios.get(
  `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
   {
    params: {
      pickup: pickup,
      destination: destination
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
   }
  );

   setFare(response.data)

  }

  const createRide = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error("Error creating ride:", error.response?.data || error.message);
  }
 };







  return (
    <div className='h-screen relative overflow-hidden'>
      <img className="w-20 absolute left-5 top-5" src={uberLogo} alt="" />
      <div className='h-screen w-screen '>

        <div class="h-[70%]">
        <LiveTracking/>
        </div>
        {/* <img className='h-full w-full object-cover' src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-suboptimal.jpg" alt="" /> */}
      </div>
      <div className='h-screen absolute flex flex-col justify-end top-0 w-full pointer-events-none '>
        <div className='h-[30%] bg-white relative p-5'>
          <h5 
            ref={panelCloseRef} 
            onClick={() => { setIsPanelOpen(false); setActiveField(""); }} 
            className='absolute opacity-0 right-2 top-6 text-2xl'
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={submitHandler}>
            <input 
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder='Add a pickup Location'
              onClick={() => {
                setIsPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
            <div className="line absolute h-[50px] w-1 top-1/2 bg-gray-700 left-10 rounded-full"></div>
            <input  
              className="bg-[#eee] px-12 py-2 text-lg rounded-xl w-full mt-3"
              type="text"
              placeholder='Enter Destination Location'
              onClick={() => {
                setIsPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <button onClick={findTrip} className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full">
              Find Trip
            </button>
          </form>
        </div>
        <div ref={panelRef} className='bg-white p-2'>
          {/* Pass the current query text based on activeField */}
          <LocationSearchPanel 
            searchQuery={activeField === "pickup" ? pickup : destination} 
            handleSuggestionSelect={handleSuggestionSelect}
          />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='w-full fixed z-10 bottom-0 px-3 py-10 pt-12 translate-y-full bg-white'>
        <VehiclePanel selectVehicle={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
      </div>
      <div ref={confirmRidePanelRef} className='w-full fixed z-10 bottom-0 px-3 py-6 pt-12 translate-y-full bg-white'>
        <ConfirmRide 
        createRide={createRide}
        fare={fare}
        vehicleType={vehicleType}
        pickup={pickup}
        destination={destination}
        setConfirmRidePanel={setConfirmRidePanel} 
        setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={vehicleFoundRef} className='w-full fixed z-10 bottom-0 px-3 py-6 pt-12 translate-y-full bg-white'>
        <LookingForDriver
        fare={fare}
        vehicleType={vehicleType}
        pickup={pickup}
        destination={destination}
        setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={waitingForDriverRef} className='w-full fixed z-10 bottom-0 px-3 py-6 pt-12 bg-white'>
        <WaitingForDriver 
        ride={ride}
        setwaitingForDriver={setwaitingForDriver}/>
      </div>
    </div>
  )
}

export default Home;