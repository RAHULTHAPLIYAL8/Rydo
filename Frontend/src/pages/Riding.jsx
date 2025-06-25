import React from 'react'
import { Link,useLocation} from 'react-router-dom'
import {useEffect,useContext} from 'react'
import {SocketContext} from '../context/SocketContext'
import {useNavigate} from 'react-router-dom'

const Riding = () => {
  const location=useLocation();
  const {ride}=location.state|| {};
  const {socket}=useContext(SocketContext);
  const {navigate}=useNavigate();

  socket.on("ride-ended",()=>
  {
      console.log("This rocket run successfully")
      navigate('/home')
  })

  return (
    <div className='h-screen'>
      <Link to="/home" className='right-2 top-2 fixed h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-home-line"></i>
      </Link>
      <div className='h-1/2'>
        <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='h-1/2 p-4'>
       <div className='flex items-center justify-between'>
         <img className='h-15' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_203,w_360/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png" alt="" />
         <div>
            <h2 className='text-lg font-medium '>{ride?.captain.fullname.firstname}</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
            <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
         </div>
      </div>
      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full  mt-5 flex flex-col gap-5">
             <div className="flex items-center gap-5 border-b-[1px] border-b-gray-400">
              <i className="text-lg ri-map-pin-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11 A</h3>
                <p className="text-sm mt-1 text-gray-600">{ride?.destination}</p>
              </div>
            </div>
             <div className="flex items-center gap-5 ">
                <i className="text-lg ri-cash-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11 A</h3>
                <p className="text-sm mt-1 text-gray-600">{ride?.fare}</p>
              </div>
            </div>
        </div>
      </div>
      <button className="relative z-50 w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">Make a Payment</button>
      </div> 
    </div>
  )
}

export default Riding