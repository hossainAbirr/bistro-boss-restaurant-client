import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Category from "./Category";
import FeaturedItem from "./FeaturedItem/FeaturedItem";
import PopularMenu from "./PopularMenu/PopularMenu";
import Tesmonial from "./Testimonials/Tesmonial";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
           <Banner></Banner> 
           <Category></Category>
           <PopularMenu></PopularMenu>
           <FeaturedItem></FeaturedItem>
           <Tesmonial></Tesmonial>
        </div>
    );
};

export default Home;