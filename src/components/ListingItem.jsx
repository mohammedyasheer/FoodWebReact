import React from 'react'
import {Link, useNavigate} from 'react-router-dom' 
import { ReactComponent as DeleteIcon } from '../images/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../images/editIcon.svg'


function ListingItem({listing, id, onEdit, onDelete}) {

  const navigate = useNavigate()

  return (
        <>
            <li className='list-none card md:w-12/12 sm:w-full my-3'>
                <ul>
                    <div className='md:flex md:flex-row sm:flex-col sm:flex'>
                        <img src={listing.imgUrls[0]} alt={listing.name} className='md:w-72 sm:w-96 rounded md:max-h-72 cursor-pointer'  onClick={() => navigate(`/paying-guest/${id}`)}/>
                        <div className='pl-4'>
                            <h3 className=' font-bold sm:text-xl sm:text-left'>{listing.name}</h3>
                            <div className='flex'>
                {onDelete && (
      <DeleteIcon
        className='cursor-pointer'
        fill='rgb(231, 76,60)'
        onClick={() => onDelete(listing.id, listing.name)}
      />
    )}
    {onEdit && (
      <EditIcon
        className='ml-2 cursor-pointer'
        fill='rgb(0, 0,0)'
        onClick={() => onEdit(listing.id, listing.name)}
      />
    )}
    </div>
                            <hr className='w-9 mt-3'/>
                            <div className='mt-2'>
                                <p className='md:inline sm:block'>{listing.bathrooms} bathrooms .</p>
                                <p className='md:inline pl-1 sm:block'>{listing.bed} beds</p>
                            </div>
                            <div >
                                <p className='md:inline sm:hidden'>{listing.wifi ? 'Wifi .' : 'NO wifi .'}</p>
                                <p className='md:inline sm:hidden pl-1'>{listing.airCooler ? 'AC Available .' : 'NO AC .'}</p>
                                <p className='md:inline sm:hidden pl-1'>{listing.parking ? 'Parking Available .' : 'NO Parking .'}</p>
                                <p className='md:inline sm:hidden pl-1'>{listing.specificDish ? 'Specific Dish': 'Regular Menu'}</p>
                            </div>
                            <div className='mt-4'>
                            <p className='md:inline sm:hidden'>Vacant for: {listing.gender}</p>
                            </div>
                            <div>
                            <p className='md:inline sm:hidden'>Location: {listing.location}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col sm:items-start sm:pl-3 md:items-end justify-items-end pr-3 font-bold'>
                        <p>
                        &#x20B9;{listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
           / Month</p>
                    </div>
                </ul>
               
            </li>
        </>
  )
}

export default ListingItem