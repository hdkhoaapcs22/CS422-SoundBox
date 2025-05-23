import React from "react";
import Subscription from "../components/home/Subcription";
import UserComment from "../components/home/UserComment";
import Download from "../components/home/Download";
import TopTierFeature from "../components/home/TopTierFeature";
import assets from "../assets/assets";
import TopSongFigure from "../components/home/TopSongFigure";
import ExpressYourselfSection from "../components/home/ExpressYourSelf";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full" id="Home">
            <ExpressYourselfSection />
            <TopSongFigure />
            <div className="flex justify-center w-full">
                <img src={assets.melody2} alt="" className="w-20 md:w-full sm:w-full h-24 mb-10" />
            </div>
            <TopTierFeature />
            <UserComment />
            <Download />
            <Subscription />
        </div>
    );
};

export default Home;
