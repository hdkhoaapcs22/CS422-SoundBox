import React from "react";
import Subscription from "../components/home/Subcription";
import UserComment from "../components/home/UserComment";

const Home = () => {
    return (
        <div className="px-32">
            <UserComment />
            <Subscription />
        </div>
    );
};

export default Home;
