import React from 'react'

const WaitingForDriver = (props) => {
  return (
       <div>
      {" "}
      <h5 className="p-1  pb-20 text-center w-[93%] absolute top-0 ">
        <i
          // onClick={() => props.setVehicleFound(false)}
          style={{ fontSize: "50px" }}
          className="p-20 text-gray-600 ri-arrow-drop-down-line"
        ></i>
      </h5>
      <div className='flex items-center justify-between'>
         <img className='h-15' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_203,w_360/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png" alt="" />
         <div>
            <h2 className='text-lg font-medium '>{props.ride?.captain.fullname.firstname + ' ' + props.ride?.captain.fullname.lastname}</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
            <p className='text-sm text-gray-600'>{props.ride?.captain.vehicle.vehicleType}</p>
              <h2 className='text-lg font-semibolf '>{props.ride?.otp}</h2>
         </div>
      </div>
      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full  mt-5 flex flex-col gap-5">
            <div className="flex items-center gap-5 border-b-[1px] border-b-gray-400">
             <i className="text-lg ri-map-pin-user-line"></i>
              <div>
                <h3 className="text-lg font-medium">562/11 A</h3>
                <p className="text-sm mt-1 text-gray-600">{props.ride?.pickup}</p>
              </div>
            </div>
             <div className="flex items-center gap-5 border-b-[1px] border-b-gray-400">
              <i className="text-lg ri-map-pin-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11 A</h3>
                <p className="text-sm mt-1 text-gray-600">{props.ride?.destination}</p>
              </div>
            </div>
             <div className="flex items-center gap-5 ">
                <i className="text-lg ri-cash-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11 A</h3>
                <p className="text-sm mt-1 text-gray-600">{props.ride?.fare}</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver