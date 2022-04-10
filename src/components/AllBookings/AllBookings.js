import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Spinner from '../ui/Spinner';



const useStyles = makeStyles({
    table: {
        minWidth: '100%'
    },
});

const Allbookings = () => {

    const [orders, setOrders] = useState()

    const classes = useStyles();

    const getBookingOrders = async () => {



        const { data } = await axios.get('https://trip-connect-api.herokuapp.com/allBookings', {
            method: 'GET',


            headers: {
                'auth-token': sessionStorage.getItem('token'),

            },


        })
        setOrders(data)

    }

    useEffect(() => {

        getBookingOrders()
    }, [])



    if (!sessionStorage.getItem('token')) {
        window.location = "/login"
        return;
    }




    if (!orders) {
        return (
            <Spinner />
        )
    }

    return (
        <div style={{ width: '80%', margin: '1rem auto' }}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Hotel Name</TableCell>
                            <TableCell align="right">City Name</TableCell>
                            <TableCell align="right">Cost</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell component="th" scope="row">
                                    {order.hotel_name}
                                </TableCell>
                                <TableCell align="right">{order.city_name}</TableCell>
                                <TableCell align="right">₹{order.cost}</TableCell>
                                <TableCell align="right">{order.date}</TableCell>
                                <TableCell align="right" style={{ color: 'red' }}>{order.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Allbookings