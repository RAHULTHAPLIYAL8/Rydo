import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const FinishRide = (props) => {

  const navigate=useNavigate();
  
  async function endRide(){
    
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, 
      {
        rideId: props.ride._id,
      },
      {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    },
    );

    if (response.status === 200) {
      props.setFinishRidePanel(false);
      navigate('/captain-home');
    }
  } catch (error) {
    console.error("Error ending ride:", error);
  }
}



  return (
    <div>
           <div>
             
              <h5 className="p-1 pb-20 text-center w-[93%] absolute top-0 z-10">
                <i
                  onClick={()=>{props.setFinishRidePanel(false)}}
                  style={{ fontSize: "50px" }}
                  className="p-20 text-gray-600 ri-arrow-drop-down-line"
                ></i>
              </h5>
        
              {/* Header */}
              <h2 className="pt-9 text-2xl font-semibold mb-5">Finish this Ride</h2>
              
              <div className='flex items-center p-4 border-2 border-yellow-300  justify-between mt-3'>
                <div className='flex items-center gap-3'>
                <img className="h-12 w-10 rounded-full object-cover " src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 km</h5>
              </div>
              {/* Content */}
              <div className="flex flex-col justify-between items-center gap-2">
                <div className="w-full mt-5 flex flex-col gap-5">
                  <div className="flex items-center gap-5 border-b-[1px] border-b-gray-400">
                    <i className="text-lg ri-map-pin-user-line"></i>
                    <div>
                      <h3 className="text-lg font-medium">Pickup</h3>
                      <p className="text-sm mt-1 text-gray-600">
                       {props.ride?.pickup}
                      </p>
                    </div>
                  </div>
        
                  <div className="flex items-center gap-5 border-b-[1px] border-b-gray-400">
                    <i className="text-lg ri-map-pin-fill"></i>
                    <div>
                      <h3 className="text-lg font-medium">562/11 A</h3>
                      <p className="text-sm mt-1 text-gray-600">
                       {props.ride?.destination}
                      </p>
                    </div>
                  </div>
        
                  <div className="flex items-center gap-5">
                    <i className="text-lg ri-cash-fill"></i>
                    <div>
                      <h3 className="text-lg font-medium">562/11 A</h3>
                      <p className="text-sm mt-1 text-gray-600">
                       {props.ride?.fare}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="w-full mt-6 ">
                   <button
                  onClick={endRide}
                  className="relative  flex justify-center z-50 w-full mt-5 text-lg bg-green-600 text-white font-semibold p-2 rounded-lg"
                >
                  Finish Ride
                </button>
                  <p className=' mt-10 text-xs'>Click on Finish Ride Button if you have completed the payment</p>
                </div>
              </div>
            </div>
    </div>
  )
}

export default FinishRide