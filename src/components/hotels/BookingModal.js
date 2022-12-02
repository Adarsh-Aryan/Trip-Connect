import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, TextField } from "@material-ui/core";
import Loader from "../../images/loader.svg";
import ErrorMessage from "../ui/ErrorMessage";
import "./BookingModal.css";
import { postResponse } from "../../helper/parseResponse";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const BookingModal = (props) => {
  const { hotel_name, city_name, cost } = props.hotel;

  const classes = useStyles();

  const [error, setError] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState();

  const placeHotelBooking = async () => {
    if (!date || !phoneNumber) {
      setError("Please Specify All The Fields!");
      return;
    }

    if (phoneNumber.length !== 10) {
      setError("Number must be 10 digit");
      setLoading(false)
      return;
    }

    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_PAYMENT_GATEWAY_URL}/paynow`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: Math.floor(Math.random() * 100000),
          hotel_name,
          city_name,
          cost,
          bookingDate: date,
          status: "Pending",
          phone: phoneNumber,
          email: sessionStorage.getItem("userInfo"),
        }),
      }
    );

    if (response.ok) {
      setLoading(false);
      const data = await response.json();
      console.log(data)
      const responseData = {
        action: "https://securegw-stage.paytm.in/theia/processTransaction",
        params: data,
      };

      postResponse(responseData);
      return;
    }

    if (!response.ok) {
      setError("Something Went Wrong!");
      setLoading(false)
    }
  };

  const body = (
    <div className={`${classes.paper} booking_modal`}>
      <h2 id="simple-modal-title">Book Room</h2>
      <div className="modal_controls">
        <label htmlFor="hotelName">Hotel Name</label>
        <TextField
          variant="outlined"
          id="hotelName"
          value={hotel_name}
          disabled
        />
      </div>

      <div className="modal_controls">
        <label htmlFor="price">Price</label>
        <TextField
          variant="outlined"
          id="price"
          value={`₹${cost}/day`}
          disabled
        />
      </div>
      <div className="modal_controls">
        <label htmlFor="date">Phone Number</label>
        <TextField
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          placeholder="eg.9345672367"
          required={true}
          value={phoneNumber}
          type="number"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          variant="outlined"
          id="number"
        />
      </div>
      <div className="modal_controls" style={{ cursor: "pointer" }}>
        <label htmlFor="date">CheckIn Date</label>
        <TextField
          onChange={(e) => {
            setDate(e.target.value);
          }}
          value={date}
          variant="outlined"
          id="date"
          type="date"
        />
      </div>

      <div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div style={{ marginTop: "1rem" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              props.handleClose();
            }}
          >
            Close
          </Button>
          &nbsp; &nbsp;
          <Button
            variant="contained"
            color="primary"
            onClick={placeHotelBooking}
          >
            {!loading ? (
              "Check Out"
            ) : (
              <img src={Loader} alt="loader" style={{ width: "60%" }}></img>
            )}
          </Button>
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
  );
};

export default BookingModal;
