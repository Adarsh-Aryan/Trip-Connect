import React, { useContext } from "react";
import { TripContext } from "../../context/TripContext";
import { Link } from "react-router-dom";
import "./ListingHotels.css";

const ListingHotels = (props) => {
  const { listingHotels } = props;

  const {
    listingState: { bySort, byFacilities, byCost },
  } = useContext(TripContext);

  let filterHotels = listingHotels;

  const filterListingData = () => {
    if (byFacilities.length > 0) {
      filterHotels = filterHotels.filter((item) => {
        return byFacilities.every((facility) =>
          item.facilities.some((data) => data.fac_name === facility)
        );
      });
    }

    if (bySort) {
      if (bySort === "lowToHigh") {
        filterHotels = filterHotels.sort((a, b) => {
          return a.cost - b.cost;
        });
      } else if (bySort === "highToLow") {
        filterHotels = filterHotels.sort((a, b) => {
          return b.cost - a.cost;
        });
      }
    }

    if (byCost) {
      if (byCost === "All") {
        return filterHotels;
      } else {
        const lcost = Number(byCost.split("-")[0]);
        const hcost = Number(byCost.split("-")[1]);

        filterHotels = filterHotels.filter((item) => {
          return Number(item.cost) >= lcost && Number(item.cost) <= hcost;
        });
      }
    }

    return filterHotels;
  };

  if (filterListingData().length === 0) {
    return <h1 className="not_found">Oops! No Hotels Found </h1>;
  }

  return (
    <div className="listing_hotels">
      {filterListingData().map((item) => {
        return (
          <div className="hotel_content" key={item.hotel_id}>
            <div className="hotel_img">
              <img src={item.hotel_img} alt={item.hotel_name} />
            </div>
            <div className="hotel_details">
              <h3>
                {item.hotel_name}, {item.city_name}
              </h3>
              <p style={{ color: "gray" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
                asperiores sequi architecto.
              </p>
              <div className="hotel_performance">
                <div>
                  <span>{item.rating} &#9733;</span>
                  <span style={{ color: "blue" }}>{item.ratingText}</span>
                </div>
                <Link to={`/hotels/${item.hotel_id}`} className="btn">
                  More Details
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListingHotels;
