import { TripContext } from "./TripContext";
import React, { useReducer, useState } from "react";
import { ListingReducer } from "./ListingReducer";

const TripState = ({ children }) => {
  const [openLogout, setOpenLogout] = useState(false);

  const [listingState, listingDispatch] = useReducer(ListingReducer, {
    byCost: "",
    byFacilities: [],
    bySort: "",
  });

  return (
    <TripContext.Provider
      value={{ listingState, listingDispatch, openLogout, setOpenLogout }}
    >
      {children}
    </TripContext.Provider>
  );
};

export default TripState;
