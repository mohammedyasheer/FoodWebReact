import {React, useState} from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'

function ForgetPassword() {
  const  [email, setEmail]  = useState('')

  const onChange = e => {
    setEmail(() => 
      e.target.value
  )
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Reset Link Sent')


    } catch (error) {
      toast.error('Something Went Wrong')
      
    }
  }

  return (
   
    <>
      <form onSubmit={onSubmit}>
        <input type="email"  onChange={onChange} id="email" value={email}/>
        <button>Send ResetLink</button>
      </form>
    </>
  )
}

export default ForgetPassword