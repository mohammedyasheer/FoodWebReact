import React, { useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import {db} from '../firebase.config' 
import { toast } from 'react-toastify'
import googleIcon from '../images/googleIcon.svg'

function OAuth() {

    const navigate = useNavigate()
    const location = useLocation()

    const onClick = async(e) => {

        try{
        const provider = new GoogleAuthProvider()
        const auth = getAuth()

        const result = await signInWithPopup(auth, provider)

        const user = result.user

        //Checking whether the user already exist
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)

        if(!docSnap.exists()) {
            await setDoc(doc(db, 'users', user.uid), {
                name: user.displayName,
                emial: user.email,
                timeStamp: serverTimestamp()
            })
        }
        navigate('/')
    }  catch (error) {
            toast.error('User already Exist')

        }

    }

  return (
      <>
      <div className="flex flex-col items-center">
      <h3 className="mt-5 ">{location.pathname === '/login' ? 'SignIn' : 'SignUp'} With Google</h3>
    <div className="socialIconDiv" onClick={onClick}>
        <img className="socialIconImg" src={googleIcon} alt="Google" />
    </div>
    <Link className='mt-4' to={location.pathname === '/login' ? '/Sign-up' : '/login'}>{location.pathname === '/login' ? 'SignUp' : 'SignIn'} Instead ?</Link>
    </div>
        </>
  )
}

export default OAuth