import {React, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

function Navigation() {

  const [showNav, setShowNav] = useState(false)
  let mobNav

    mobNav = <div className= {showNav ? 'block' : 'hidden'}>
        <ul className='sm:pr-7 flex flex-col justify-center items-left h-screen lg:hidden'>
                <Link to='/offers' className='font-bold mb-9 text-xl'>Offer </Link>
                <Link to='/paying-guest' className='font-bold mb-9 text-xl'>Paying Guest</Link>
                
            </ul>
    </div>

  return (

    <div className="container mx-auto mb-2">
    {/* Navigation */}
 <div className="flex justify-between">

 <Link to='/' className='hero font-bold italic'> <FontAwesomeIcon icon={faPizzaSlice} color='red' />FoodWeb</Link>  
 {mobNav}  
 <div className='sm:hidden lg:inline-block'>
            <ul className='mt-2'>
                <Link to='/offers' className='font-bold  px-4'>Offer </Link>
                <Link to='/paying-guest' className='font-bold  px-4'>Paying Guest</Link>
                 
            </ul>
        </div>
        <div className='text-4xl mr-2 mt-2 sm:inline-block lg:hidden '>
          <FontAwesomeIcon icon={faBars} onClick={() => {setShowNav(!showNav)}}/>
        </div>
    </div>
 </div>

  )
}

export default Navigation