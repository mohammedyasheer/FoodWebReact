import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {db} from '../firebase.config'
import { getAuth, signInWithEmailAndPassword  } from 'firebase/auth'
import {toast} from 'react-toastify'
import OAuth from '../components/OAuth'
import Navbar from '../components/Navbar'

function Login() {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email,password}  = formData


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value 

    }))
  }

  const onSubmit = async(e) => {
    e.preventDefault()
      try {
          const auth = getAuth()

          const userCred = await signInWithEmailAndPassword(auth, email, password)

          const user = userCred.user
          if(user) {
            navigate('/')
          }


      } catch (error) {
        toast.error('Bad Credentials')
        
      }
    
  }
  return (
    <>
      <div className='loginInBg h-full'>
        <Navbar />
        <div className="container mx-auto justify-center flex flex-col items-center h-screen">
          <div className="border h-4/5">
          <div className=" bg-gradient-to-r from-gray-400 to-transparent h-full">
          <form onSubmit={onSubmit} className='p-8'>
          <h2 className="text-4xl mb-2 font-bold ">Welcome Back</h2>
          <p className='mb-4'>Login with your email and password</p>
            <label>Email</label><br />
            <input type="email" value={email} id="email" onChange={onChange} className='border mb-2 w-full' placeholder='Email'/><br />
            <label>Password</label><br />
            <input type={showPassword ? 'text' : 'password'}  value={password} className='border mb-5 w-full' id="password" onChange={onChange} placeholder='Password' />
            <FontAwesomeIcon className='showPasswordLogin' onClick={() => setShowPassword((prevState) => !prevState)}icon={faEye} /><br />
            <button className='border-blue-400 border-2 bg-blue-200 px-8 py-1 rounded w-full'>LogIn</button>
          </form>
          <OAuth />
          
          </div>
          </div>
          </div>         
        </div>
      </>
  )
}

export default Login