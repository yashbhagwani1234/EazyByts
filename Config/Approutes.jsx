import React from 'react'
import {Route,Routes} from 'react-router'
import App from '../App'
import Chatpage from '../Components/Chatpage'
const Approutes = () => {
  return (   
      <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/chat' element={<Chatpage/>}/>
          <Route path='/service' element={<h1>This is service page</h1>}/>
          <Route path='/*' element={<h1>404 not found</h1>}/>
       </Routes>
  )
}

export default Approutes
