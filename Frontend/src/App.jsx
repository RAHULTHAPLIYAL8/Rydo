import React from 'react'
import { Route,Routes} from 'react-router-dom'
import Start from './pages/Start'
import Home from "./pages/Home"
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from "./pages/UserLogout"
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import Riding from "./pages/Riding"
import CaptainRiding from './pages/CaptainRiding'
import SocketProvider from './context/SocketContext'

const App = () => {
  return (
    <Routes>
      <Route></Route>
      <Route path='/' element={<Start/>}/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/riding' element={<Riding/>}/>
      <Route path='/signup' element={<UserSignup/>}/>
       <Route path='/captain-riding' element={
        <CaptainProtectWrapper>
        <CaptainRiding/>
        </CaptainProtectWrapper>
        }/>
      <Route path='/captain-login' element={<CaptainLogin/>}/>
      <Route path='/captain-signup' element={<CaptainSignup/>}/>
      <Route path="/home" element={<UserProtectWrapper>
        <Home/>
      </UserProtectWrapper>}/>
      <Route path="/user/logout" element={<UserProtectWrapper>
        <UserLogout/>
      </UserProtectWrapper>}/>
      <Route path="/captain-home" element={
        <CaptainProtectWrapper>
        <CaptainHome/>
        </CaptainProtectWrapper>
        }/>
       </Routes>
  )
}

export default App