import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import Approutes from './Config/Approutes.jsx'
import { Toaster } from 'react-hot-toast'
import { ChatProvider } from './Contact/ChatContact.jsx'
createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
       <Toaster position='top-right'/>
       <ChatProvider>
          <Approutes/>
       </ChatProvider>
    </BrowserRouter>
  
)
