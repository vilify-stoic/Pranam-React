import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from './Shimmer'
import {Link} from "react-router-dom"

function filterData(searchText, restaurants) {
  console.log(searchText);
  const filterData = restaurants.filter((restaurant) =>
  restaurant?.data?.name?.toLowerCase()?.includes(searchText.toLowerCase())
  );
  return filterData;
}

const Body = () => {

  console.log("render");

  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

    useEffect(()=>{
      console.log("useEffect");
        getRestaurants();
    }, []);

    async function getRestaurants(){
      const data = await fetch(
              "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
          );
        const json = await data.json();
        console.log(json);
        setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
        setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    }

  
  if(!allRestaurants) 
    return null;

  return allRestaurants?.length === 0 ? <Shimmer/> : (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
         value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            //need to filter the data
            const data = filterData(searchText, allRestaurants);
            // update the state - restaurants
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>
      </div>
      <div className="restaurant-list">
        {filteredRestaurants.map((restaurant) => {
          return (
            <Link
             to={"/restaurant/" + restaurant.data.id }
             key={restaurant.data.id}
            >
              <RestaurantCard {...restaurant.data}  />
            </Link>
          );
       })}
      </div>
    </>
  );
};

export default Body;