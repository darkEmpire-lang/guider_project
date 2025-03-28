import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import AddGuider from './components/AddGuider'
import ManageGuiders from './components/ManageGuiders'
import GuiderList from './components/GuiderList'


const App = () => {


  

  return (
    <div>
      
      <Routes>
        <Route path='/' element={<GuiderList />} />
        <Route path='/add' element={<AddGuider />} />
        <Route path='/add' element={<AddGuider />} />
        <Route path='/list' element={<ManageGuiders />} />
      
      

      </Routes>
     
    </div>
  )
}

export default App
