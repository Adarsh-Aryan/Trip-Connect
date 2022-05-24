import React, { useContext } from "react";
import { TripContext } from "../../context/TripContext";
import { costFilter, sortingList } from "../../helper/trip-util";
import "./FilterSection.css";

const FilterSection = (props) => {
  const {
    listingState: { bySort, byFacilities, byCost },
    listingDispatch,
  } = useContext(TripContext);

  function isFacilityChecked(fac_name) {
    if (byFacilities.includes(fac_name)) {
      return true;
    }

    return false;
  }

  function isChecked(category, name) {
    if (category === name) {
      return true;
    }

    return false;
  }

  return (
    <div className="filters">
      <div className="filter_main_heading">
        <h4>Filters: By</h4>
      </div>
      <hr className="line" />
      <div className="filter_heading">
        <h2>Facilities</h2>
        {props.facilities.map((facility, index) => {
          return (
            <label key={index} style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                value={facility.fac_name}
                name="facility"
                onChange={(e) => {
                  if (!e.target.checked) {
                    listingDispatch({
                      type: "REMOVE_FACILITY",
                      payload: e.target.value,
                    });
                  } else {
                    listingDispatch({
                      type: "ADDING_FACILITY",
                      payload: e.target.value,
                    });
                  }
                }}
                checked={isFacilityChecked(facility.fac_name)}
              />
              {facility.fac_name}
            </label>
          );
        })}
      </div>
      <hr className="line" />
      <div className="filter_heading">
        <h2>Cost Filter</h2>
        <label>
          <input
            type="radio"
            value="All"
            name="cost"
            onChange={(e) => {
              listingDispatch({
                type: "FILTER_BY_COST",
                payload: e.target.value,
              });
            }}
            checked={isChecked(byCost, "All")}
          />
          All
        </label>
        {costFilter.map((cost_item, index) => {
          return (
            <label key={index} style={{ cursor: "pointer" }}>
              <input
                type="radio"
                value={`${cost_item.lcost}-${cost_item.hcost}`}
                name="cost"
                onChange={(e) => {
                  listingDispatch({
                    type: "FILTER_BY_COST",
                    payload: e.target.value,
                  });
                }}
                checked={isChecked(
                  byCost,
                  `${cost_item.lcost}-${cost_item.hcost}`
                )}
              />
              {`${cost_item.lcost}-${cost_item.hcost}`}
            </label>
          );
        })}
      </div>
      <hr className="line" />
      <div className="filter_heading">
        <h2>Sort By Cost:</h2>
        {sortingList.map((sort_item, index) => {
          return (
            <label key={index} style={{ cursor: "pointer" }}>
              <input
                type="radio"
                value={sort_item.msg}
                name="sorting"
                onChange={(e) => {
                  listingDispatch({
                    type: "FILTER_BY_SORT",
                    payload: e.target.value,
                  });
                }}
                checked={isChecked(bySort, sort_item.msg)}
              />
              {sort_item.msg}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSection;
