import React from 'react'
import { useNavigate } from 'react-router-dom'
import Food from '../images/hero1.jpg'
import Bed from '../images/bed.jpg'

function Card() {

    const navigate = useNavigate();

  return ( 
     <>
     <div className=" flex justify-center mt-5 mx-8 ">
        {/* <div className="mx-3 card cursor-pointer" onClick={() => navigate('/order-food')}>
            <img src={Food} alt="Order Food" className='md:w-96 sm:w-60 rounded'/>
            <p className='md:text-3xl flex justify-center items-center mt-2 sm:text-xl'> Order Food</p>
        </div> */}
        <div className="card cursor-pointer" onClick={() => navigate('/paying-guest')}>
            <img src={Bed} alt="Paying Guest" className='md:w-96 sm:w-60  rounded'/>
            <p className='md:text-3xl flex justify-center items-center mt-2 sm:text-xl'> Book your Stay</p>
        </div>
     </div>
     </>
  )
}

export default Card