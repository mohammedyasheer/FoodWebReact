import {React, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { collection, getDocs, query, orderBy, startAfter, where, limit } from 'firebase/firestore' 
import {db} from '../firebase.config'

import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'
import Navigation from '../components/Navigation'



function PayingGuest() {

  const [listings, setListings] = useState(null)
  const [loading, setLoading]  = useState(true)
  
  useEffect(() => {
    const fetchListing = async() => {
        try {

          // Getting a reference of the collection
          const listingRef = collection(db, 'PG')

          // Create query
          const q = query(listingRef, 
            where('offer', '==', false),
            orderBy('timestamp', 'desc'),
            limit(10)
            )

            // Execute query
            const querySnap = await getDocs(q)

            const listings = []

            querySnap.forEach((doc) =>{
             return listings.push({
               id:doc.id,
               data: doc.data()
             })
            })

            setListings(listings)
            setLoading(false)
        } catch (error) {
          toast.error('Could not fetch listings')
        }
    }

    fetchListing()
  }, [])

  return (
    <>
      <Navigation />
      <div className='mx-10'>
      {/* offer Slider */}

      {loading ? <Spinner /> : listings && listings.length > 0 ? (
        <>
        <div>{listings.map((doc) => (
          <ListingItem listing={doc.data} id={doc.id} key={doc.id}/>
      ))}</div>
        </> 
      ) : <h3>No Lisiting in Regular Price check  <Link to='/offers' className='underline'> Offers</Link> page</h3>}
    </div>
    </>


  )
}

export default PayingGuest