import { TripContext } from "./TripContext";
import React, { useReducer } from 'react'
import { ListingReducer } from "./ListingReducer";


const TripState = ({ children }) => {

    const [listingState, listingDispatch] = useReducer(ListingReducer, {
        byCost: '',
        byFacilities: [],
        bySort: ''

    })

    return (
        <TripContext.Provider value={{ listingState, listingDispatch }}>
            {children}
        </TripContext.Provider>
    )
}

export default TripState