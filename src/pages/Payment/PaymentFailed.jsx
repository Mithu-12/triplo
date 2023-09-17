import React from 'react'

import { useParams } from 'react-router-dom'

const PaymentFailed = () => {
    const {id} = useParams()
  return (
    <div className='p-36'>Payment Failed{id}</div>
  )
}
export default PaymentFailed