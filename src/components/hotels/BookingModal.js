import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Modal, TextField } from '@material-ui/core'

import Loader from '../../images/loader.svg'
import { useHistory } from 'react-router-dom'
import ErrorMessage from '../ui/ErrorMessage'
import './BookingModal.css'

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const BookingModal = (props) => {


    const { hotel_name, city_name, cost } = props.hotel

    const classes = useStyles();

    const [error, setError] = useState()

    const [loading, setLoading] = useState(false)

    const [date, setDate] = useState()

    const history= useHistory()

    const placeHotelBooking = () => {




        if (!date) {


            setError('Please Specify A Date')


            return;
        }



        setLoading(true)

        fetch('https://trip-connect-api.herokuapp.com/placeBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hotel_name, city_name, cost, date, status: 'Not Confirmed', email: sessionStorage.getItem('userInfo')})
        }).then(() => {
            history.push('/allbookings')
            setLoading(false)
        })
    }

    const body = (
        <div className={`${classes.paper} booking_modal`}>
            <h2 id="simple-modal-title">Book Room</h2>
            <div className='modal_controls'>
                <label htmlFor="hotelName">Hotel Name</label>
                <TextField variant='outlined' id='hotelName' value={hotel_name} disabled />
            </div>
            <div className='modal_controls'>
                <label htmlFor="cityName">City Name</label>
                <TextField variant='outlined' id='cityName' value={city_name} disabled />
            </div>

            <div className='modal_controls'>
                <label htmlFor="price">Price</label>
                <TextField variant='outlined' id='price' value={`₹${cost}/day`} disabled />
            </div>
            <div className='modal_controls' style={{ cursor: 'pointer' }}>
                <label htmlFor="date">Booking Date</label>
                <TextField onChange={(e) => {
                    setDate(e.target.value)
                }} variant='outlined' id='date' type='date' />
            </div>


            <div>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <div style={{ marginTop: '1rem' }}>

                    <Button variant='contained' color='secondary' onClick={() => {
                        props.handleClose()
                    }}>Close</Button>
                    &nbsp; &nbsp;
                    <Button variant='contained' color='primary' onClick={placeHotelBooking}>{!loading ? 'Check Out' :
                        <img src={Loader} alt="loader" style={{ width: '60%' }}></img>}</Button>
                </div>

            </div>

        </div>
    );


    return (
        <Modal
            open={props.open}

            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    )
}

export default BookingModal