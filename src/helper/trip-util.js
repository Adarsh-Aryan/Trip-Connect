import axios from 'axios'

export async function getAllCity(){
    const response = await fetch('https://trip-connect-api.herokuapp.com/location')
    const cityData =response.json()

    return cityData
}

export async function getAllCatgory(){
    const response=await fetch('https://trip-connect-api.herokuapp.com/hotelType')
    const hotelCategory= await response.json()

    return hotelCategory
}

export async function getHotelDetails(hotelId){

    const {data} =await axios.get(`https://trip-connect-api.herokuapp.com/details/${hotelId}`)

    return data


}

export async function getListingHotels(category){
    const response = await fetch(`https://trip-connect-api.herokuapp.com/hotelsCat/${category}`)

    const ListingHotels= await response.json()

    return ListingHotels
}

export async function getAllFacilities(){
    const response=await fetch('https://trip-connect-api.herokuapp.com/allFacilities')
    const facilities = await response.json()

    return facilities
}

export const costFilter=[
    {
        cost_id:"1",
        lcost:500,
        hcost:2000
    },
    {
        cost_id:"2",
        lcost:2000,
        hcost:3000
    },
    {
        cost_id:"3",
        lcost:3000,
        hcost:5000
    },
    {
        cost_id:"4",
        lcost:5000,
        hcost:8000
    }
]

export const sortingList=[
    {
        sort_id:1,
        sort:-1,
        msg:"lowToHigh"
    },
    {
        sort_id:2,
        sort:1,
        msg:"highToLow"
    }
]

