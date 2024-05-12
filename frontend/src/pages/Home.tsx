// @ts-ignore
import React from 'react';
import Navbar from "../components/Navbar.tsx";
import Announcement from "../components/Announcement.tsx";
import Slider from "../components/Slider.tsx";
import Categories from "../components/Categories.tsx";
import Products from "../components/Products.tsx";
import NewsLetter from "../components/NewsLetter.tsx";
import Footer from "../components/Footer.tsx";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Announcement/>
            <Slider/>
            <Categories/>
            <Products from={'home'}/>
            <NewsLetter/>
            <Footer/>
        </div>
    );
};

export default Home;