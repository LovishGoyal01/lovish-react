    import RestaurantCard from "./RestaurantCard";
    import { useEffect, useState } from "react";
    import Shimmer from "./Shimmer";

    const Body = () => {

        const [ListOfRestaurant, setListOfRestaurant]= useState([]); 
        const [filterdRestaurant, setfilterdRestaurant]= useState([]); 
        
        const [searchtext,setsearchtext]=useState("");

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
               setfilterdRestaurant(restaurants);
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
                   <div className="search">
                    <input 
                    type="text" 
                    className="search-box"
                    value={searchtext}
                    onChange={(e) =>{ setsearchtext(e.target.value);}}
                    >
                    </input>
                    <button onClick={()=> {
                     
                    const filterdReasturant= ListOfRestaurant.filter((res) => res.info.name.toLowerCase().includes(searchtext.toLowerCase())
                    );
                    setfilterdRestaurant(filterdReasturant);
                    }}
                    >Search
                    </button>
                   </div>

                    <button
                     className="filter-btn" onClick={() => {
                        const filteredlist = ListOfRestaurant.filter(
                            (res) =>  res.info.avgRating > 4 );
                        setfilterdRestaurant(filteredlist);
                     }}
                    >
                    Top Rated Restaurant
                    </button>
                </div>
                <div className="res-container">
                { filterdRestaurant.map((restaurant) => (
                    <RestaurantCard key={restaurant.info.id} resdata={restaurant} />
                ))}
                
                </div>
            </div>
        )
    }

    export default Body;