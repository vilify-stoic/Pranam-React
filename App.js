import React from 'react'
import ReactDom from 'react-dom/client';
import {restaurantList} from './data.js'

const ImgTag = ()=>(
    <a href="/">
        <img 
            className = 'logo' 
            src="https://yt3.ggpht.com/ytc/AMLnZu_EC-ECXAxRAixWGEfMsE1rdSoetBHyxmLNdtCB=s900-c-k-c0x00ffffff-no-rj"
            alt="logo"
        />
    </a>
);

const Header = () => {
    return (
        <div className='header'>
            <ImgTag/>
            <div className='nav-items'>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    );
};

const RestaurantCard = (props) => {
    return (
        <div className='card'>
            <img src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/ ${props.cloudinaryImageId}`}
             alt="sss" />
             <h2>{props.name}</h2>
             <h2>{props.cuisines.join(" , ")}</h2>
             <h2>{props.lastMileTravelString}</h2>
        </div>
    )
}

const Body = () => {
    return (
        <div className='restaurant-list'>
            {
                // <RestaurantCard restaurant={restaurantList[0]}></RestaurantCard>
                restaurantList.map((restaurant) =>  {
                    return <RestaurantCard {...restaurant.data} />
                })
            }
        </div>
    )
}

const Footer = () => {
    return <h4>Footer</h4>
};

const AppLayout = () => {
    return (
        <>
        <Header/>
        <Body/>
        <Footer/>
        </>
    )
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<AppLayout/>);
