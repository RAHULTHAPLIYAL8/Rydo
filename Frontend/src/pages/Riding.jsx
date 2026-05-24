import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import axios from 'axios'

const Riding = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);

  const loadScript = async (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  useEffect(() => {
    socket.on("ride-ended", () => {
      navigate('/home');
    });

    return () => {
      socket.off("ride-ended");
    };
  }, []);

  const onPayment = async (price, user_id, captain_id) => {

    try {

      const options = {
        fare: price,
        userId: user_id,
        captainId: captain_id
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payment/create`,
        options,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const data = res.data;

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load");
        return;
      }

      const paymentObject = new window.Razorpay({
        key: "rzp_test_SkS4yzsZrzBmXn",
        order_id: data.id,
        amount: data.amount,
        currency: data.currency,

        handler: async function (response) {

          const options2 = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature
          };

          try {

            const verifyRes = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/payment/verify`,
              options2
            );

            if (verifyRes.data.success) {
              alert("Payment Successful");
            } else {
              alert("Payment Failed");
            }

          } catch (err) {
            console.log(err);
          }
        }
      });

      paymentObject.open();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='h-screen'>

      <Link
        to="/home"
        className='right-2 top-2 fixed h-10 w-10 bg-white flex items-center justify-center rounded-full'
      >
        <i className="text-lg font-medium ri-home-line"></i>
      </Link>

      <div className='h-1/2'>
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className='h-1/2 p-4'>

        <div className='flex items-center justify-between'>
          <img
            className='h-15'
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_203,w_360/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png"
            alt=""
          />

          <div>
            <h2 className='text-lg font-medium'>
              {ride?.captain?.fullname?.firstname}
            </h2>

            <h4 className='text-xl font-semibold -mt-1 -mb-1'>
              {ride?.captain?.vehicle?.plate}
            </h4>

            <p className='text-sm text-gray-600'>
              Maruti Suzuki Alto
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center gap-2">

          <div className="w-full mt-5 flex flex-col gap-5">

            <div className="flex items-center gap-5 border-b-[1px] border-b-gray-400">
              <i className="text-lg ri-map-pin-fill"></i>

              <div>
                <h3 className="text-lg font-medium">Destination</h3>

                <p className="text-sm mt-1 text-gray-600">
                  {ride?.destination}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <i className="text-lg ri-cash-fill"></i>

              <div>
                <h3 className="text-lg font-medium">Fare</h3>

                <p className="text-sm mt-1 text-gray-600">
                  ₹ {ride?.fare}
                </p>
              </div>
            </div>

          </div>
        </div>

        <button
          onClick={() =>
            onPayment(
              ride?.fare,
              ride?.user?._id,
              ride?.captain?._id
            )
          }
          className="relative z-50 w-full mt-5 bg-blue-950 text-white font-semibold p-2 rounded-lg"
        >
          Make a Payment
        </button>

      </div>
    </div>
  )
}

export default Riding