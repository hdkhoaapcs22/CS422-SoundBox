import React from "react";
import Subscription from "../components/home/Subcription";
import UserComment from "../components/home/UserComment";
import Download from "../components/home/Download";

const Home = () => {
    return (
        <div className="px-32">
            <UserComment />
            <Download />
            <Subscription />
        </div>
    );
};

export default Home;
