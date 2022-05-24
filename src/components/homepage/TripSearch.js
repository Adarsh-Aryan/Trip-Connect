import "./TripSearch.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function TripSearch(props) {
  const allcity = props.city;

  const [hotelData, showHotelData] = useState([]);

  const history = useHistory();

  async function cityChangeHandler() {
    const cityId = document.getElementById("city").value;

    const response = await fetch(
      `https://trip-connect-api.herokuapp.com/hotels/${cityId}`
    );

    const data = await response.json();

    showHotelData(data);
  }

  function hotelChangeHandler() {
    const hotelId = document.getElementById("hotel").value;
    history.push(`/hotels/${hotelId}`);
  }

  return (
    <div className="search">
      <h1>Let's make your best trip ever!</h1>
      <div className="select_box">
        <select
          name="city"
          id="city"
          className="city"
          onChange={cityChangeHandler}
        >
          <option>Select City</option>
          {allcity.map((item) => {
            return (
              <option key={item.city_id} value={item.city_id}>
                {item.city_name}
              </option>
            );
          })}
        </select>
        <select
          name="hotels"
          id="hotel"
          className="hotels"
          onChange={hotelChangeHandler}
        >
          <option>Select Hotels</option>
          {hotelData.map((item) => {
            return (
              <option key={item.hotel_id} value={item.hotel_id}>
                {item.hotel_name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default TripSearch;
