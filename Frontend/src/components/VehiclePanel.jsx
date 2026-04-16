import React from 'react'


const VehiclePanel = (props) => {
  return (
    <div>
        <h5 className="p-1  pb-20 text-center w-[93%] absolute top-0 "><i  onClick={()=>{props.setVehiclePanel(false)}} style={{fontSize:"50px"}} className="p-20 text-gray-600 ri-arrow-drop-down-line"></i></h5>
        <h2 className='pt-9 text-2xl font-semibold mb-5'>Choose a Vechile</h2>
            <div onClick={()=>{props.setConfirmRidePanel(true);;props.selectVehicle('car')}} className='p-3 my-3 w-full flex items-center justify-center active:border-2 border-black rounded-xl'>
           <img  className='mr-3'  width="100" src="https://e7.pngegg.com/pngimages/296/130/png-clipart-yellow-bajaj-re-autorickshaw-auto-rickshaw-bajaj-auto-car-piaggio-ape-tuk-tuk-taxi-mode-of-transport-motorcycle.png" alt="car png" />
           <div className='w-1/2'>
           <h4 className='font-medium text-lg'>Rido<span><i className="ri-user-fill">4</i></span></h4>
           <h5 className='font-medium text-sm'>2mins away</h5>
           <p className='font-medium text-xs text-gray-500'>Affordable, compact rides</p>
           </div>
           <h2 className='text-lg font-semibold'>{"\u20B9"}{props.fare.car}</h2>
           </div>
           <div onClick={()=>{props.setConfirmRidePanel(true);props.selectVehicle('motorcycle')}} className='p-3 my-3  w-full flex items-center justify-center   active:border-2 border-black rounded-xl'>
           <img style={{height:"50px"}} className='mr-3'  width="100"  src="https://e7.pngegg.com/pngimages/47/912/png-clipart-yellow-motor-scooter-motorcycle-car-vespa-illustration-motorcycle-comics-scooter.png" alt="car png" />
           <div className='w-1/2'>
           <h4 className='font-medium text-lg'>Rido<span><i className="ri-user-fill">2</i></span></h4>
           <h5 className='font-medium text-sm'>2mins away</h5>
           <p className='font-medium text-xs text-gray-500'>Affordable, compact rides</p>
           </div>
           <h2 className='text-lg font-semibold'>{"\u20B9"}{props.fare.motorcycle}</h2>
           </div>
           <div onClick={()=>{props.setConfirmRidePanel(true);props.selectVehicle('auto')}} className='p-3 my-3  w-full flex items-center justify-center  active:border-2 border-black rounded-xl'>
           <img className='mr-3' width="100" src="https://e7.pngegg.com/pngimages/340/27/png-clipart-car-uber-taxi-vehicle-new-york-city-taxi-driver-compact-car-sedan.png" alt="car png" />
           <div className='w-1/2'>
           <h4 className='font-medium text-lg'>Rido<span><i className="ri-user-fill">3</i></span></h4>
           <h5 className='font-medium text-sm'>2mins away</h5>
           <p className='font-medium text-xs text-gray-500'>Affordable, compact rides</p>
           </div>
            <h2 className='text-lg font-semibold'>₹{props.fare.auto}</h2>
           </div>
    </div>
  )
}

export default VehiclePanel