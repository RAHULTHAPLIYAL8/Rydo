import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios' 


const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('');
  
      const navigate=useNavigate();

      const submitHandler = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setridePopupPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }
      }

  return (
           <div>
     
      <h5 className="p-1 pb-20 text-center w-[93%] absolute top-0 z-10">
        <i
          onClick={() =>props.setridePopupPanel(false)}
          style={{ fontSize: "50px" }}
          className="p-20 text-gray-600 ri-arrow-drop-down-line"
        ></i>
      </h5>

      {/* Header */}
      <h2 className="pt-9 text-2xl font-semibold mb-5">Confrim this Ride to Start</h2>
      
      <div className='flex items-center p-3 bg-yellow-300  justify-between mt-3'>
        <div className='flex items-center gap-3'>
        <img className="h-12 w-10 rounded-full object-cover " src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <h2 className='text-lg font-medium'>Rahul Thapliyal</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 km</h5>
      </div>
      {/* Content */}
      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full mt-5 flex flex-col gap-5">
          <div className="flex items-center gap-5 border-b-[1px] border-b-gray-400">
            <i className="text-lg ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-lg font-medium">562/11 A</h3>
              <p className="text-sm mt-1 text-gray-600">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 border-b-[1px] border-b-gray-400">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11 A</h3>
              <p className="text-sm mt-1 text-gray-600">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <i className="text-lg ri-cash-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11 A</h3>
              <p className="text-sm mt-1 text-gray-600">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>
        <div class="w-full mt-1 ">
         <form onSubmit={(e)=>{submitHandler(e)}}>
          <input 
          type="number"  
          placeholder='Enter your otp'
          onChange={(e)=>{setOtp(e.target.value)}}
          value={otp}
           className="bg-[#eee] px-6 py-2 text-lg rounded-xl w-full mt-3"
          />
           <button
          onClick={submitHandler}
          // to="/captain-riding"
          className="relative  flex justify-center z-50 w-full text-lg mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
        >
          Confirm 
        </button>
          <button
          onClick={() => props.setConfirmRidePopupPanel(false)}
          className="relative z-50 w-full mt-1 text-lg bg-red-700 text-white font-semibold p-2 rounded-lg"
        >
         Cancel
        </button>
         </form>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp