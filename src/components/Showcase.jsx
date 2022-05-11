import React from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import Navbar from './Navbar'
import Card from './Card'
import Footer from './Footer'
import Food from '../images/hero1.jpg'


function Showcase() {

    const navigate = useNavigate()
    const location = useLocation()

  return (
    <>
     {/* Hero */}
    <div className="HeroImg">
      <Navbar />
     <div className='flex flex-col justify-center items-center h-screen'>
        <h2 className='md:text-5xl  text-white italic sm:text-2xl sm:pl-18 md:text-4xl sm:px-6'>Enjoy Food that preparied in  </h2>
        
        <div>
          <h2 className='md:text-5xl mb-6 text-white font-bold italic sm:text-2xl sm:pl-18 md:text-4xl sm:px-6'>Home</h2>
        </div>
        <form action='#'>
          <input type="text" className='border-2 md:h-10 md:w-96 text-black sm:w-62 sm:h-8 '/>
          <button className='border-blue-400 border-2 bg-blue-600 md:px-4 md:py-2 rounded m-1 sm:py-1 sm:px-3' type="submit">Search</button>
        </form>
      </div>
    </div>
    <div className='bg-gray-200 pb-9'>
    <h3 className='flex justify-center items-center md:text-4xl font-bold pt-7 italic sm:text-lg sm:px-1'>Let's turn this world as our single Home</h3>
    <p className='flex justify-center items-center italic sm:text-sm md:text-xl'>We make you fell like you are at your sweet Home</p>
    <Card />
    </div>
    <Footer />
    </> 
  )
}

export default Showcase