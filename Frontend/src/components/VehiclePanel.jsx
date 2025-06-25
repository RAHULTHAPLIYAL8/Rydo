import React from 'react'


const VehiclePanel = (props) => {
  return (
    <div>
        <h5 className="p-1  pb-20 text-center w-[93%] absolute top-0 "><i  onClick={()=>{props.setVehiclePanel(false)}} style={{fontSize:"50px"}} className="p-20 text-gray-600 ri-arrow-drop-down-line"></i></h5>
        <h2 className='pt-9 text-2xl font-semibold mb-5'>Choose a Vechile</h2>
            <div onClick={()=>{props.setConfirmRidePanel(true);;props.selectVehicle('car')}} className='p-3 my-3 w-full flex items-center justify-center active:border-2 border-black rounded-xl'>
           <img width="100" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_203,w_360/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png" alt="car png" />
           <div className='w-1/2'>
           <h4 className='font-medium text-lg'>UberGo<span><i className="ri-user-fill">4</i></span></h4>
           <h5 className='font-medium text-sm'>2mins away</h5>
           <p className='font-medium text-xs text-gray-500'>Affordable, compact rides</p>
           </div>
           <h2 className='text-lg font-semibold'>{props.fare.car}</h2>
           </div>
           <div onClick={()=>{props.setConfirmRidePanel(true);props.selectVehicle('motorcycle')}} className='p-3 my-3  w-full flex items-center justify-center   active:border-2 border-black rounded-xl'>
           <img width="100" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_384,w_576/v1648178001/assets/c2/362140-9bdc-43ac-b149-d73610fcd9b2/original/Uber_Moto_558x372_pixels_Desktop.png" alt="car png" />
           <div className='w-1/2'>
           <h4 className='font-medium text-lg'>UberGo<span><i className="ri-user-fill">2</i></span></h4>
           <h5 className='font-medium text-sm'>2mins away</h5>
           <p className='font-medium text-xs text-gray-500'>Affordable, compact rides</p>
           </div>
           <h2 className='text-lg font-semibold'>{props.fare.motorcycle}</h2>
           </div>
           <div onClick={()=>{props.setConfirmRidePanel(true);props.selectVehicle('auto')}} className='p-3 my-3  w-full flex items-center justify-center  active:border-2 border-black rounded-xl'>
           <img width="100" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_384,w_576/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="car png" />
           <div className='w-1/2'>
           <h4 className='font-medium text-lg'>UberGo<span><i className="ri-user-fill">3</i></span></h4>
           <h5 className='font-medium text-sm'>2mins away</h5>
           <p className='font-medium text-xs text-gray-500'>Affordable, compact rides</p>
           </div>
           <h2 className='text-lg font-semibold'>{props.fare.auto}</h2>
           </div>
    </div>
  )
}

export default VehiclePanel