import {React, useState, useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import {v4 as uuidv4} from 'uuid'
import { toast } from 'react-toastify';
import {db} from '../firebase.config'
import Spinner from '../components/Spinner'



function HouseListing() {
    
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        airCooler : false,
        bathrooms: 1,
        bed: 1, 
        gender: '',
        regularPrice: 0,
        discountedPrice : 0,
        location: '',
        name: '',
        offer: false,
        parking: false,
        specificDish: false,
        userRef: '',
        wifi: false,
        images: {},
    })
    const isMounted = useRef(true)

    const {airCooler, bathrooms, bed, gender, regularPrice, discountedPrice, location, name, offer, parking, specificDish, userRef, wifi, images}  =  formData

    const auth = getAuth()
    const navigate = useNavigate()

    useEffect(() => {

        if(isMounted) {
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    setFormData({...formData, userRef: user.uid})
                }else{
                    navigate('/login')
                }
            })
        }
        return () => {
            isMounted.current = false
        }
    }, [isMounted])

    if(loading) {
        return <Spinner />
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        console.log(formData);
        setLoading(true)
       //Store image in file
       const storeImage = async(image) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage()
          const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
          const storageRef = ref(storage, 'images/ '+ fileName)
          const uploadTask = uploadBytesResumable(storageRef, image);

          uploadTask.on('state_changed', 
(snapshot) => {

  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
  }
}, 
(error) => {
  reject(error)
  // Handle unsuccessful uploads
}, 
() => {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    resolve(downloadURL);
  });
}
);

        })
        
      }
      const imgUrls = await Promise.all(
        [...images].map((image) => storeImage(image))
      ).catch(() => {
        setLoading(false)
        toast.error('Imaged Not Uploaded')
        return
      }) 
      console.log(imgUrls);

      const formDataCopy = {
          ...formData,
          imgUrls,
          timestamp : serverTimestamp()
      }

      delete formDataCopy.images
      const docRef = await addDoc(collection(db, 'PG'), formDataCopy)
      setLoading(false)
      toast.success('listing saved')
      navigate(`/paying-guest/${docRef.id}`)
     
    }

    const onMutate = e => {
        let boolean = null

        if(e.target.value === 'true'){
            boolean = true
        }
        if(e.target.value === 'false'){
            boolean = false
        }

        if(e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }))
        }
       if(!e.target.files) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : boolean ?? e.target.value
        }))
       }
        
    }

  return (
    <>
    <div className='bg-slate-800'>
    <div className="container bg-teal-400 md:w-1/3 sm:w-2/3 mx-auto p-4">
        <h2 className='text-3xl'>House Listing</h2>
        <form onSubmit={onSubmit}>
            <label className='block'>Name</label>
            <input type="text" className='border border-black-500 mb-2' id='name' value={name} onChange={onMutate} required  maxLength='32'
            minLength='10'/>
            <div className='flex'>
                <div>
                    <label className='block '>Bed</label>
                    <input type="number" className='border mb-2' id='bed' value={bed} onChange={onMutate} required min='1'
                max='50'/>
                </div>
                <div className=' pl-5'>
                    <label className='block'>Bathroom</label>
                    <input type="number" className='border mb-2' id= 'bathrooms' value={bathrooms} onChange={onMutate} required min='1'
                max='50'/>
                </div>
            </div>
            <label className='block'>Offer</label>
            <button type='button' id='offer' value={true} onClick={onMutate} className={offer ? 'formButtonActive' : 'formButton'}>Yes</button>
            <button type='button' id='offer' className={
                !offer && offer !== null ? 'formButtonActive' : 'formButton'
              } value={false} onClick={onMutate}>No</button>
            {offer && (
                <>
                <label className='block'>Discounted Price</label>
                <input type="number" className='border mb-2' id= 'discountedPrice' value={discountedPrice} onChange={onMutate} min='50'
              max='750000000'required/>
                </>
            )}
             <label className='block'>Regular Price</label>
             <input type="number" className='border mb-2' id= 'regularPrice' value={regularPrice} onChange={onMutate} min='50'
              max='750000000'required/>
             
             <label className='block'>Parking</label>
            <button type='button' id='parking' value={true} onClick={onMutate} className={parking ? 'formButtonActive' : 'formButton'}>Yes</button>
            <button type='button' id='parking' className={
                !parking && parking !== null ? 'formButtonActive' : 'formButton'
              } value={false} onClick={onMutate} >No</button>
             <label className='block'>Wifi</label>
            <button type='button' id='wifi' value={true} onClick={onMutate} className={wifi ? 'formButtonActive' : 'formButton'}>Yes</button>
            <button type='button' id='wifi' className={
                !wifi && wifi !== null ? 'formButtonActive' : 'formButton'
              } value={false} onClick={onMutate}>No</button>
             <label className='block'>Specific Dish</label>
            <button type='button' id='specificDish' value={true} onClick={onMutate} className={specificDish ? 'formButtonActive' : 'formButton'}>Yes</button>
            <button type='button' id='specificDish' className={
                !specificDish && specificDish !== null ? 'formButtonActive' : 'formButton'
              } value={false}onClick={onMutate} >No</button>
             <label className='block'>Air Cooler</label>
            <button type='button' id='airCooler' value={true} onClick={onMutate} className={airCooler ? 'formButtonActive' : 'formButton'}>Yes</button>
            <button type='button' id='airCooler' className={
                !airCooler && airCooler !== null ? 'formButtonActive' : 'formButton'
              } value={false} onClick={onMutate}>No</button>
            <label className='block'>Location</label>
            <textarea type="text" className='border mb-2 h-28 md:w-64 sm:w-58' id='location' value={location} onChange={onMutate} required/>
            <label className='block'>Vacancy For</label>
            {/* <input type="text" className='border mb-2' id='location' value={gender} onChange={onMutate}/> */}
            <select id="gender" onChange={onMutate}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unisex">Unisex</option>
            </select>
            <label className='block mb-3'>Images</label>
          <p>
            The first image will be the cover (max 6).
          </p>
          <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <button type='submit' className='block mt-10 mx-auto p-5 bg-slate-800 w-full text-white rounded-lg'>
            Create Listing
          </button>
        </form>
    </div>
    </div>
    </>
  )
}

export default HouseListing