import {React, useState, useEffect} from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import {doc, getDoc} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config' 
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'  
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocation } from '@fortawesome/free-solid-svg-icons'
import { faWifi } from '@fortawesome/free-solid-svg-icons'
import { faSquareParking } from '@fortawesome/free-solid-svg-icons'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faBowlFood } from '@fortawesome/free-solid-svg-icons'
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../components/Spinner'
import NavigationBar from '../components/Navigation'
import shareIcon from '../images/shareIcon.svg' 
SwiperCore.use([Navigation, Scrollbar, Pagination, A11y])

function SingleHouseListing() {

    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [sharedLinkCopied, setSharedLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()
    
    
    
    useEffect(() => {
      const fetchListing = async () => {
          const docRef = doc(db, 'PG', params.listingId)
          const docSnap = await getDoc(docRef)

          if(docSnap.exists()) {
            console.log(docSnap.data())
              setListing(docSnap.data())
              setLoading(false)
          }
      }   
      fetchListing()
    }, [params.listingId])

    if (loading) {
      return <Spinner />
    }

  return (  

      <>
        <NavigationBar />
      <main className='mx-10'>
        <h1 className='text-4xl'>{listing.name}</h1>
        <p><FontAwesomeIcon icon={faLocation}/>{listing.location ? listing.location : 'Contact Landlord to get the Location'}</p>
        <div className="shareIconDiv" onClick={() =>{
                navigator.clipboard.writeText(window.location.href)
                    setSharedLinkCopied(true)
                setTimeout(()=> {
                    setSharedLinkCopied(false)
                }, 2000)
            }}>
                <img src={shareIcon} alt="Share Icon"/>
            </div>
            {sharedLinkCopied && <p className='linkCopied'>Link Copied</p>}
       <Swiper slidesPerView={1} pagination={{clickable: true}}>
            {listing.imgUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <img src={listing.imgUrls[index]} alt={listing.name} />

                </SwiperSlide>
            ))}
          </Swiper>
        
          <p className='mt-5 text-2xl'>What this place offers</p>
          <div className="flex mt-3">
            <div>
              <ul>
                <li><FontAwesomeIcon icon={faWifi}/> {listing.wifi ? 'Wifi' : 'No Wifi'}</li>
                <li><FontAwesomeIcon icon={faSquareParking}/> { listing.parking ? 'Free parking on premises' : 'No Parking'}</li>
                <li><FontAwesomeIcon icon={faWind}/> {listing.airCooler ? 'Air Cooler' : 'No AirCooler'}</li>
                <li><FontAwesomeIcon icon={faBowlFood}/> { listing.specificDish ? 'Will provide the food that you want' : 'Regular Hostel Menu'}</li>
                {listing.offer && (
          <p className='discountPrice'><FontAwesomeIcon icon={faIndianRupee}/> 
           { listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}
              </ul>
            </div>
          </div>
          <h3 className='text-2xl mt-3'>About the Place</h3>
          <div className='mt-2 mb-3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum voluptas ad porro explicabo, rem ipsam facere repellendus possimus assumenda autem minus quam illo corporis suscipit modi aliquid aspernatur alias necessitatibus ut sint, sapiente quis maiores. Impedit ut, animi in nemo dicta excepturi eum, nostrum soluta quae itaque debitis voluptate facilis id sint rem! Nobis repudiandae maiores necessitatibus sint, in soluta deleniti harum esse veniam alias rem vitae quos? Dicta impedit magni repudiandae, blanditiis maxime magnam quod, tempora vero molestiae praesentium quas! Totam optio placeat eos fugit. Quas distinctio, vero nulla quidem eos repellat temporibus a suscipit, delectus repudiandae id impedit!
          </div>

          {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className='primaryButton'
          >
            Contact Landlord
          </Link>
        )}
      </main>
      </>
  )
}

export default SingleHouseListing