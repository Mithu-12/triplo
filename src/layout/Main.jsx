import React, { useEffect, useState } from 'react'
import Navbar from '../pages/shared/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/shared/Footer'

const Main = () => {
  
  
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer/>
    </div>
  )
}

export default Main