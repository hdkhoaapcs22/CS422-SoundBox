import React from "react";
import Subscription from "../components/home/Subcription";
import UserComment from "../components/home/UserComment";
import Download from "../components/home/Download";
import TopTierFeature from "../components/home/TopTierFeature";
import assets from "../assets/assets";
import TopSongFigure from "../components/home/TopSongFigure";

const Home = () => {
    return (
        <div className="px-60">
            <TopSongFigure />
            <div className="flex justify-end ">
                <img src={assets.melody} alt="" className="w-[700px] h-24" />
            </div>
            <TopTierFeature />
            <UserComment />
            <Download />
            <Subscription />
        </div>
    );
};

export default Home;
