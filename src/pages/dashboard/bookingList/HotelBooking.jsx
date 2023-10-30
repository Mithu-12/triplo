import React from 'react'

const HotelBooking = () => {
  const hotelsImg = '/coming-soon.png'
  return (
    <div className='w-full flex justify-center items-center bg-white py-7'>
    <img className='w-48' src={hotelsImg} alt="Hotel Img" />
    </div>
  )
}

export default HotelBooking;