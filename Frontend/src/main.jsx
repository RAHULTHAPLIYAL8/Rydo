import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import CaptainContext from './context/CaptainContext.jsx'
import UserContext from './context/UserContext.jsx'
import SocketProvider from './context/SocketContext.jsx'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
     
   <CaptainContext>
    <UserContext>
    <SocketProvider>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </SocketProvider>
    </UserContext>
    </CaptainContext>

)
