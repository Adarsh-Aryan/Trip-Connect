
import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'

import { useParams } from "react-router-dom"
import { getHotelDetails } from '../../helper/trip-util'
import Spinner from '../ui/Spinner'
import BookingModal from './BookingModal'
import './HotelDetails.css'

function HotelDetailsPage() {

    const [hotelDetails, setHotelDetails] = useState()

    const [open, setOpen] = useState(false)

    

    const { hotelId } = useParams()
    
    

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        if (!sessionStorage.getItem('token')) {
            window.location='/login'
            return;
        }

        setOpen(true)
    }

    const fetchHotelData=async()=>{

        const hotelData = await getHotelDetails(hotelId)

        setHotelDetails(hotelData)
    }
    

    useEffect(() => {

        fetchHotelData()
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hotelId])



    if (!hotelDetails) {
        return (
            <Spinner />
        )
    }



    return (
        <div className='details'>
            <div className='image'>
                <img src={hotelDetails.hotel_img} alt={hotelDetails.hotel_name} />
            </div>
            <div className='content'>
                <h1>{hotelDetails.hotel_name}</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum vitae similique commodi, ullam nihil repellendus aliquam debitis ab fugit reiciendis in reprehenderit nostrum eos consequatur minus perferendis ex dicta rerum ipsum dolorum quasi quas quo libero. Quos repudiandae obcaecati ipsam? Reprehenderit inventore, voluptatem architecto tempora et nihil excepturi asperiores maiores ab.</p>
                <h3>Cost: &#8377; {hotelDetails.cost}/day</h3>
                {<h4>{hotelDetails.address} &nbsp; {hotelDetails.contact && `, ${hotelDetails.contact}`}</h4>}
                <Button variant='contained' color='primary' style={{ marginTop: '1rem' }} onClick={handleOpen

                }>Book Rooms</Button>

                <BookingModal open={open} hotel={hotelDetails} handleClose={handleClose} />

            </div>
        </div>
    )
}


export default HotelDetailsPage