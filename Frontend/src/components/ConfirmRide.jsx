import React from "react";

const ConfirmRide = (props) => {
  return (
    <div>    
      <h5 className="p-1 pb-20 text-center w-[93%] absolute top-0 z-10">
        <i
          onClick={() => props.setConfirmRidePanel(false)}
          style={{ fontSize: "50px" }}
          className="p-20 text-gray-600 ri-arrow-drop-down-line"
        ></i>
      </h5>

      {/* Header */}
      <h2 className="pt-9 text-2xl font-semibold mb-5">Confirm your Ride</h2>

      {/* Content */}
      <div className="flex flex-col justify-between items-center gap-2">
        <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_203,w_360/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png"
          alt="UberX"
        />

        <div className="w-full mt-5 flex flex-col gap-5">
          <div className="flex items-center gap-5 border-b-[1px] border-b-gray-400">
            <i className="text-lg ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-lg font-medium">562/11 A</h3>
              <p className="text-sm mt-1 text-gray-600">
                {props.pickup}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 border-b-[1px] border-b-gray-400">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11 A</h3>
              <p className="text-sm mt-1 text-gray-600">
               {props.destination}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <i className="text-lg ri-cash-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{props.fare[props.vehicleType]}</h3>
              <p className="text-sm mt-1 text-gray-600">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>

      
        <button
          onClick={() => {props.setVehicleFound(true);
            console.log(props.vehicleType)
            console.log(props.fare)
            props.setConfirmRidePanel(false);
            props.createRide();   

          }
          }
          className="relative z-50 w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
        >
          Confirm 
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
