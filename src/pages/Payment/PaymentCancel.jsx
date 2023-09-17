import React from 'react'

import { useParams } from 'react-router-dom'

const PaymentCancel = () => {
    const {id} = useParams()
  return (
    <div className='p-36'>Payment Cancel{id}</div>
  )
}
export default PaymentCancel;