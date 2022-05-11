import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { setDoc, doc, serverTimestamp  } from 'firebase/firestore'
import {db} from '../firebase.config' 
import {toast} from 'react-toastify'
import OAuth from '../components/OAuth'
import signInImg from '../images/formImg.jpg'
import Navbar from '../components/Navbar'


function SignIn({showNav}) {
const [showPassword, setShowPassword] = useState(false)
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: ''
})

const {name, email, password} = formData
const navigate = useNavigate()

const onChange = (e) => {
  setFormData((prevState) => ({
    ...prevState,
    [e.target.id] : e.target.value
  }))
}

const onSubmit = async(e) => {
  e.preventDefault()
  try {
      const auth  = getAuth()

      const userCred = await createUserWithEmailAndPassword(auth,email, password)

      const user = userCred.user
      
      updateProfile(auth.currentUser, {
        displayName: name
      })

      const copyFormData = {...formData}
      delete copyFormData.password
      copyFormData.timeStamp = serverTimestamp()
      setDoc(doc(db, 'users', user.uid ), copyFormData)

      navigate('/')

  } catch (error) {
   toast.error('Something Went Wrong')
    
  }
}

  return (
      <>
      <div className='signInBg h-full'>
      <Navbar/> 
        <div className="container mx-auto justify-center flex flex-col items-center h-screen">
          <div className="border md:h-4/5 sm:h-5/5 ">
          <div className=" bg-gradient-to-r from-gray-400 to-transparent h-full">
          <form onSubmit={onSubmit} className='p-8'>
          <h2 className="text-4xl mb-2 font-bold ml-14">Welcome</h2>
          <p className='mb-4' >SignUp with your email and password</p>
            <label>Name</label> <br />
            <input type="text" value={name} id="name" onChange={onChange} className='border mb-2 w-full' placeholder='Name'/><br />
            <label>Email</label><br />
            <input type="email" value={email} id="email" onChange={onChange} className='border mb-2 w-full' placeholder='Email'/><br />
            <label>Password</label><br />
            <input type={showPassword ? 'text' : 'password'}  value={password} className='border mb-5 w-full' id="password" onChange={onChange} placeholder='Password' />
            <FontAwesomeIcon className='showPassword' onClick={() => setShowPassword((prevState) => !prevState)}icon={faEye} /><br />
            <button className='border-blue-400 border-2 bg-blue-200 px-8 py-1 rounded w-full'>SignIn</button>
          </form>
          <OAuth />
          </div>
          </div>
          </div>         
        </div>
      </>
  )
}

export default SignIn