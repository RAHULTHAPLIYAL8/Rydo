import React from 'react'
import {UserDataContext} from '../context/UserContext'

const UserProfile = ({setUserProfileShow}) => {
 
  const {user,setUser}=React.useContext(UserDataContext);


  return (
       <div>
      {" "}
      <h1 
  className="float-right font-bold cursor-pointer"
  onClick={() => {
    setUserProfileShow(false);
  }}
>
  X
</h1>

      <h5 className="p-1 pt-20  pb-20  w-[93%] absolute top-0 font-bold">
        {user.fullname.firstname.charAt(0).toUpperCase()+ user.fullname.firstname.slice(1)} {user.fullname.lastname.charAt(0).toUpperCase()+ user.fullname.lastname.slice(1)}
      </h5>
      <div className='flex items-center justify-between'>
         <h1 className='h-15' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_203,w_360/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png" alt="" />
         <div>
            <h2 className='text-lg font-medium '></h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'></h4>
            <p className='text-sm text-gray-600'></p>
              <h2 className='text-lg font-semibolf '></h2>
         </div>
      </div>
      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full  mt-5 flex flex-col gap-5">
            <div className="flex items-center gap-5 border-b-[1px] border-b-gray-400">
             <h1 className='font-bold'>Address</h1>
              <div>
                <h3 className="text-lg font-medium">562/11 A</h3>
                <p className="text-sm mt-1 text-gray-600"></p>
              </div>
            </div>
             <div className="flex items-center gap-5 border-b-[1px] border-b-gray-400">
              <h1 className='font-bold'>Total no. of rhides</h1>
              <div>
                <h3 className="text-lg font-medium">562/11 A</h3>
                <p className="text-sm mt-1 text-gray-600"></p>
              </div>
            </div>
             <div className="flex items-center gap-5 ">
                <h1 className='font-bold'>Setting</h1>
              <div>
                <h3 className="text-lg font-medium">562/11 A</h3>
                <p className="text-sm mt-1 text-gray-600"></p>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile