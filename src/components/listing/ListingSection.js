import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllFacilities, getListingHotels } from '../../helper/trip-util'
import Spinner from '../ui/Spinner'
import FilterSection from './FilterSection'
import ListingHotels from './ListingHotels'
import './ListingSection.css'

const ListingSection = () => {



    const { category } = useParams()

    const [facility, setFacility] = useState()

    const [listingHotels, setlistingHotels] = useState()


    
    useEffect( () => {
        
        const fetchData=async()=>{
            const allHotels = await getListingHotels(category)
    
            const allFacilites = await getAllFacilities()
    
            setFacility(allFacilites)
    
            setlistingHotels(allHotels)
        }
        
        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
        
    }, [category]);

   

    if (!listingHotels || !facility) {

        return (
            <Spinner />
        )
    }

    return (
        <section className ='grid' >
            <FilterSection facilities={facility}/>
            <ListingHotels listingHotels={listingHotels}/>
        </section >
    )
}

export default ListingSection