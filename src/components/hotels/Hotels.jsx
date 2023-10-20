import React from 'react'
import './Hotels.css'
const Hotels = () => {
  const hotelsImg = '../../../public/coming-soon.png'
  return (
    <div className='hotels-container flex justify-center items-center bg-white'>
    <img className='w-56' src={hotelsImg} alt="Hotel Img" />
    </div>
  )
}

export default Hotels