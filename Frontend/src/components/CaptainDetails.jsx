import React,{useContext} from 'react'
import {CaptainDataContext} from "../context/CaptainContext"

const CaptainDetails = () => {
  const {captain}=useContext(CaptainDataContext);

  return (
          <>
            <div className='flext items-center justify-between'>
              <div className='flex items-center justify-between gap-3'>
                <img className="h-10 w-10 rounded-full object-cover" src="https://media.istockphoto.com/id/2006436002/video/happy-confident-and-portrait-of-indian-man-in-office-with-creative-professional-at-tech.avif?s=640x640&k=20&c=vcKAWd0sGJpV3xR0AK1RCM7zTEpFUcBhQEXbNvN1M78=" alt="" />
                <h4 className='text-lg font-bold capitalize'>Rahul Thapliyal</h4>
                <div><h5 className='text-xl font-semibold'>$220.33</h5>
                <p className='text-sm text-gray-600 font-medium'>Earned</p></div>

              </div>
            </div>
            <div  className="flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-5 items-start">
              <div className='text-center'>
                  <i className="text-3xl mb-2 font-extralight ri-timer-2-line"></i>
                  <h5 className='text-xl font-medium'>10.2</h5>
                  <p className='text-small text-gray-600 '>Hours Online</p>
              </div>
              <div>
                 <i className="text-3xl mb-2 font-extralight ri-speed-up-line"> </i>
                  <h5 className='text-xl font-medium'>10.2</h5>
                  <p className='text-small text-gray-600 '>Total Distance</p>
              </div>
              <div>
                   <i className="text-3xl mb-2 font-extralight ri-booklet-line"></i>
                    <h5 className='text-xl font-medium'>10.2</h5>
                  <p className='text-small text-gray-600 '>Hours Online</p>
              </div>
            </div>

            </>
  )
}

export default CaptainDetails