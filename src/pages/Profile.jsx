import {React, useState, useEffect} from 'react'
import { getAuth, updateProfile, } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {updateDoc, doc, collection, addDoc,serverTimestamp,  getDocs,
  query,
  where,
  orderBy,  
  deleteDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {useNavigate, Link} from 'react-router-dom' 
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem';

function Profile() {
  const auth = getAuth();

  const [changeDetails, setChangeDetails] = useState(false)
  const [loading, setLoading]  = useState(false)
  const [listings, setListings] = useState(null)
  const [showNav, setShowNav] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

 

  const {name, email} = formData

    const navigate = useNavigate()

    useEffect(() => {
      const fetchListings = async() => {
        const listingRef = collection(db, 'PG')
        const q = query(listingRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'))
        const querySnap = await getDocs(q)
  
        let listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setListings(listings)
        setLoading(false)
      }
         fetchListings()
    }, [auth.currentUser.uid])

    const onClick = () => {
        auth.signOut()
        navigate('/login')
  }

  let mobNav

  mobNav = <div className= {showNav ? 'block' : 'hidden'}>
  <ul className='flex flex-col justify-center h-screen'>
         <Link to='/create-house-listing' className='font-bold mb-9 text-xl'>Add House</Link>
         <span className='font-bold cursor-pointer  list-none border-b-2 py-3' onClick={onClick}>Logout</span>  
          
     </ul>
</div>

     const onSubmit = async() => {
    try {
      // update name in fb auth 
      if(auth.currentUser.displayName !== name){
        await updateProfile(auth.currentUser, {
          displayName:name,
        })
        // updated naame in firebase store
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name,
          email
        })
    setLoading(false)
      }
    }
   catch (error) {      
      toast.error('Cannot able to update, some thing went wrong')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]:e.target.value
    }))
  } 

  if(loading) {
    return <Spinner />
  }

  const onDelete = async(listingId) => {
    if(window.confirm('Are you sure you want to delete Listing?')) {
      await deleteDoc(doc(db, 'PG', listingId))
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      )
      setListings(updatedListings)
      toast.success('Successfully deleted listing')
    }
    }

   const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

  return (
  <>
  <div className='bg-gray-200'>
  <div className="">
    {/* Navigation */}
 <div className="flex justify-between">

  <Link to='/' className='hero font-bold italic ml-2'> <FontAwesomeIcon icon={faPizzaSlice} color='red' />FoodWeb</Link>  
  <div className='pr-16'>
    {mobNav}
    </div>
 <div className='sm:hidden lg:inline-block'>
            <ul className='mt-2'>
                <Link to='/create-house-listing' className='font-bold  px-4'>Add House</Link>
                <span className=' font-bold cursor-pointer px-4 list-none border-b-2 py-3' onClick={onClick}>Logout</span>  
            </ul>
        </div>
        <div className='text-4xl mr-4 mt-2 sm:inline-block lg:hidden '>
          <FontAwesomeIcon icon={faBars} onClick={() => {setShowNav(!showNav)}}/>
        </div>
    </div>
  {/*  */}
     {/* <div>
         <ul className='mt-2'>
             <Link to='/create-house-listing' className='font-bold px-4'>Create House Listing </Link>
             <Link to='/create-food-listing' className='font-bold px-4'>Create Food Listing</Link>
            
              
         </ul>
     </div> */}
 </div>


     
       <div className='flex flex-col'>
      <div>
      <div className="card md:w-96 h-40 md:m-5 md:p-4 sm:w-82 sm:m-3 sm:p-2">
        <div className='flex space-x-40'>
          <p className='font-bold'>Personal Details</p>
          <p className="changePersonalDetails" onClick={() => {changeDetails && onSubmit() 
              setChangeDetails((prevState) => !prevState)}}>{changeDetails ? 'Done' : 'Change'}</p>
        </div>
          <form className='userDetails mt-2'>
            <input type="text" id='name' className={!changeDetails ? 'profileName' : 'profileNameActive'}
            disabled={!changeDetails}
            value={name}
            onChange={onChange}
            />
            <input type="email" id='email' className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
            disabled={!changeDetails}
            value={email}
            onChange={onChange}
            />
          </form>
      </div>
      </div>
      {!loading && listings?.length > 0 && (
             <>
             <div className='ml-4'>
             <p className='listingText'>Your Listings</p>
             <ul className='md:w-full sm:w-82 mr-3'>
               {listings.map((listing) => (
                 <ListingItem
                   key={listing.id}
                   listing={listing.data}
                   id={listing.id}
                   onDelete={() => onDelete(listing.id)}
                   onEdit={() => onEdit(listing.id)}
                 /> 
               ))}
             </ul>
             </div>
           </>
          )}
      </div>   
      </div>
    
  </>
  )
}

export default Profile