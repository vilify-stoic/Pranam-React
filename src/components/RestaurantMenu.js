import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Shimmer from "./Shimmer";
import { IMG_CDN_URL } from "../contants";

const RestuarantMenu = () => {

    const {resId} = useParams();
    const [restaurantMenu, setRestaurantMenu] = useState(null);

    useEffect(() => {
        getRestaurantInfo();
    },[]);

    async function getRestaurantInfo() {
        const data = await fetch(
            "https://www.swiggy.com/dapi/menu/v4/full?lat=12.9351929&lng=77.62448069999999&menuId=" + 
            resId
        );
        const json = await data.json();
        console.log(json.data);
        setRestaurantMenu(json.data)
    }
    
    return !restaurantMenu ? (<Shimmer/>) : (
        <div className="menu">
            <div>
            <h1>Restuarant id: {resId}</h1>
            <h2> {restaurantMenu?.name} </h2>
            <img src={IMG_CDN_URL + restaurantMenu?.cloudinaryImageId} alt="" />
            <h3>{restaurantMenu?.area}</h3>
            <h3>{restaurantMenu?.city}</h3>
            <h3>{restaurantMenu?.avgRating}</h3>
            <h3>{restaurantMenu?.costForTwoMsg}</h3>
            </div>
            <div>
                <h1>Menu</h1>
                <ul>
                    {Object.values(restaurantMenu?.menu?.items).map((item)=>(
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default RestuarantMenu;