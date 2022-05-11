import {React, useState, useEffect} from 'react'
import Showcase from '../components/Showcase'
import { getAuth } from 'firebase/auth'
import Navbar from '../components/Navbar'
function Explore() {

   const [user, setUser] = useState(null)
    
    const auth = getAuth() 
   
  return (
    <>
     <Showcase />
    </>
  )
}

export default Explore