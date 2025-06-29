    import RestaurantCard from "./RestaurantCard";
    import { useEffect, useState } from "react";
    import Shimmer from "./Shimmer";

    const Body = () => {

        const [ListOfRestaurant, setListOfRestaurant]= useState([]); 

        useEffect(() => {
            fetchData();
        },[]);

     const fetchData = async () => {
          const data = await fetch("http://localhost:3001/api/restaurants");
          const json = await data.json();

         const restaurantCard = json?.data?.cards.find(
              (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
           );

         const restaurants = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  

            if (Array.isArray(restaurants)) 
                {
               setListOfRestaurant(restaurants);
                } else {
                       setListOfRestaurant([]); // prevent crash
                       console.warn("Restaurants data not found in API response.");
                       }
        };
        if(ListOfRestaurant.length ===0)
             {
                return <Shimmer/>
             }

        return(
            <div className="body">
                <div className="filter">
                    <button className="filter-btn" onClick={() => {
                        const filteredlist = ListOfRestaurant.filter(
                            (res) =>  res.info.avgRating > 4 );
                        setListOfRestaurant(filteredlist);
                }}
                    >
                    Top Rated Restaurant
                </button>
                </div>
                <div className="res-container">
                { ListOfRestaurant.map((restaurant) => (
                    <RestaurantCard key={restaurant.info.id} resdata={restaurant} />
                ))}
                
                </div>
            </div>
        )
    }

    export default Body;