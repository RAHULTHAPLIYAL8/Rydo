import {useContext,useEffect, useState} from 'react'
import {CaptainDataContext } from '../context/CaptainContext';
import {useNavigate } from 'react-router-dom'
import axios from 'axios';

const CaptainProtectWrapper = ({children}) => {
  const {captain,setCaptain}=useContext(CaptainDataContext);
  const [isLoading,setIsLoading]=useState(true)
  const navigate=useNavigate();
  const token=localStorage.getItem('token');

  useEffect(()=>
  {
    if(!token)
      {
        navigate("/captain-login");
      }

       axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  }
  ).then(Response=>
  {
    if(Response.status===200)
    {
      console.log(Response.data.captain)
      setCaptain(Response.data.captain);
      setIsLoading(false);
    }
  }).catch(err=>
  {
    console.log(err);
    localStorage.removeItem('token');
    navigate('/captain-login')
  })
  },[token]) 

  if(isLoading)
  {
    return (
      <div>Loading.....</div>
    )
  }

  return (
    <>
    {children}
    </>
  )
}

export default CaptainProtectWrapper;