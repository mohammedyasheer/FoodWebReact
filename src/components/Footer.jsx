import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  const date = new Date()

  return (
    <div className='flex justify-center items-center py-5 bg-blue-600'>&copy; FoodWeb {date.getFullYear()}</div>
  )
}

export default Footer