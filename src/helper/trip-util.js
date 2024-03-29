import axios from "axios";

export async function getAllCity() {

  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/location`
  );
  const cityData = response.json();

  return cityData;
}

export async function getAllCatgory() {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/hotelType`
  );
  const hotelCategory = await response.json();

  return hotelCategory;
}

export async function getHotelDetails(hotelId) {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/details/${hotelId}`
  );

  return data;
}

export async function getListingHotels(category) {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/hotelsCat/${category}`
  );

  const ListingHotels = await response.json();

  return ListingHotels;
}

export async function getAllFacilities() {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/allFacilities`
  );
  const facilities = await response.json();

  return facilities;
}

export const costFilter = [
  {
    cost_id: "1",
    lcost: 500,
    hcost: 2000,
  },
  {
    cost_id: "2",
    lcost: 2000,
    hcost: 3000,
  },
  {
    cost_id: "3",
    lcost: 3000,
    hcost: 5000,
  },
  {
    cost_id: "4",
    lcost: 5000,
    hcost: 8000,
  },
];

export const sortingList = [
  {
    sort_id: 1,
    sort: -1,
    msg: "lowToHigh",
  },
  {
    sort_id: 2,
    sort: 1,
    msg: "highToLow",
  },
];
