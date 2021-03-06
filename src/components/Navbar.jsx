import {React, useState} from 'react'
import {Link} from 'react-router-dom'
import { useNavigate, useLocation} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { getAuth } from 'firebase/auth'
import { ReactComponent as SignIn } from '../pages/SignIn'



function Navbar() {
    
    const [showNav, setShowNav] = useState(false)
    let mobNav

    mobNav = <div className= {showNav ? 'block' : 'hidden'}>
         <ul className=' flex flex-col justify-center items-center h-screen lg:hidden'>
         <Link to='/login' className='font-bold text-white mb-9 text-xl'>LogIn </Link>
                <Link to='/sign-up' className='font-bold text-white  mb-9 text-xl'>SignUp </Link>
                <Link to='/profile' className='font-bold text-white  mb-9 text-xl'>Profile </Link>
                 
            </ul>
    </div>


   
    
    return (
        <>
<div className=''>
   <div>
       {/* Navigation */}
    <div className="flex justify-between">
  
     <Link to='/' className='hero font-bold text-white italic '> <FontAwesomeIcon icon={faPizzaSlice} color='red' />FoodWeb</Link>  
    <div className='pr-20'>
    {mobNav}
    </div>
            <div className='sm:hidden lg:inline-block'>
                <ul className='mt-2'>
                    <Link to='/login' className='font-bold text-white px-4'>LogIn </Link>
                    <Link to='/sign-up' className='font-bold text-white px-4'>SignUp </Link>
                    <Link to='/profile' className='font-bold text-white px-4'>Profile </Link>
                    
                </ul>
            </div>
    
            <div className='text-4xl mr-4 mt-2 sm:inline-block lg:hidden '>
            <FontAwesomeIcon icon={faBars} className= 'text-white' onClick={() => {setShowNav(!showNav)}}/>
            </div>
        </div>
   </div>
   </div>   
   </>
    
  )
}

export default Navbar  