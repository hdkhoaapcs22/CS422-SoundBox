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
        <div className="px-60">
            <ExpressYourselfSection />
            <TopSongFigure />
            <div className="flex justify-end -mx-60">
                <img src={assets.melody2} alt="" className="w-[700px] h-24 mb-10" />
            </div>
            <TopTierFeature />
            <UserComment />
            <Download />
            <Subscription />
        </div>
    );
};

export default Home;
