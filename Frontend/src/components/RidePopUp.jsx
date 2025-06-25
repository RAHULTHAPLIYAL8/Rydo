

const RidePopUp = (props) => {
   
  return (
       <div >
     
      <h5 className="p-1 pb-20 text-center w-[93%] absolute top-0 z-10">
        <i
          onClick={() =>props.setridePopupPanel(false)}
          style={{ fontSize: "50px" }}
          className="p-20 text-gray-600 ri-arrow-drop-down-line"
        ></i>
      </h5>

      {/* Header */}
      <h2 className="pt-9 text-2xl font-semibold mb-5">New Ride Available</h2>
      
      <div className='flex items-center p-3 bg-yellow-300  justify-between mt-3'>
        <i class="ri-arrow-down-s-line"></i>
        <div className='flex items-center gap-3'>
        <img className="h-12 w-10 rounded-full object-cover " src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + ' '+ props.ride?.user.fullname.lastname }</h2>
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
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm mt-1 text-gray-600">
               {props.ride?.destination}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <i className="text-lg ri-cash-fill"></i>
            <div>
              <h3 className="text-lg font-medium">${props.ride?.fare}</h3>
              <p className="text-sm mt-1 text-gray-600">
                 Cash 
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full mt-5 items-center justify-between">
        <button
          onClick={() => props.setridePopupPanel(false)}
          className="relative z-50  mt-1 bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg"
         >
         Ignore
        </button>
        <button
          onClick={()=>{props.setConfirmRidePopupPanel(true)
            props.confirmRide();
          }}
          className="relative z-50  bg-green-600 text-white font-semibold p-2 px-10 rounded-lg"
        >
          Accept
        </button>
        </div>
      </div>
    </div>
  )
}

export default RidePopUp