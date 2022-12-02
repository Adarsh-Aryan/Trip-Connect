import axios from "axios";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Spinner from "../ui/Spinner";

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
  },
});

const Allbookings = () => {
  const [orders, setOrders] = useState();

  const classes = useStyles();

  const getBookingOrders = async () => {
    const { data } = await axios.get(
      `${process.env.API_BASE_URL}/allBookings`,
      {
        method: "GET",

        headers: {
          "auth-token": sessionStorage.getItem("token"),
        },
      }
    );
    setOrders(data);
  };

  useEffect(() => {
    getBookingOrders();
  }, []);

  if (!sessionStorage.getItem("token")) {
    window.location = "/login";
    return;
  }

  if (!orders) {
    return <Spinner />;
  }

  return (
    <div style={{ width: "80%", margin: "1rem auto" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row">
                ORDER_ID
              </TableCell>
              <TableCell align="right">HOTEL_NAME</TableCell>
              <TableCell align="right">CITY_NAME</TableCell>
              <TableCell align="right">COST</TableCell>
              <TableCell align="right">TXN_DATE</TableCell>
              <TableCell align="right">BANK_NAME</TableCell>
              <TableCell align="right">STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell component="th" scope="row">
                  {order._id}
                </TableCell>
                <TableCell align="right">{order.hotel_name}</TableCell>
                <TableCell align="right">{order.city_name}</TableCell>
                <TableCell align="right">₹{`${order.cost}/day`}</TableCell>
                <TableCell align="right">
                  {order.txnDate?.split(" ")[0]}
                </TableCell>
                <TableCell align="right">{order.bankName}</TableCell>
                <TableCell
                  align="right"
                  style={{
                    color: order.status === "TXN_SUCCESS" ? "green" : "red",
                  }}
                >
                  {order.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Continue Trip
        </Button>
      </div>
    </div>
  );
};

export default Allbookings;
