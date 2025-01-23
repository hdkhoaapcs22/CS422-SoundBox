import { useState, useContext } from "react";
import { AppContext } from "../../global/AppContext";

import Dashboard from "../../pages/listener/Dashboard";

import Album from "../../pages/listener/Album";
import Artist from "../../pages/listener/Artist";
import Favorite from "../../pages/listener/Favorite";
import Profile from "../../pages/listener/Profile";
import Sound from "../../pages/listener/Sound";

import CreateAlbum from "../../pages/artist/CreateAlbum";
import CreateSong from "../../pages/artist/CreateSong";
import OwnProduct from "../../pages/artist/OwnProduct";

import AppTitle from "../AppTitle";

import {
    FaTachometerAlt,
    FaMusic,
    FaUser,
    FaHeadphones,
    FaHeart,
    FaPlusCircle,
} from "react-icons/fa";

const SideBar = () => {
    const [active, setActive] = useState("Dashboard");

    const { role } = useContext(AppContext);

    const menuItems = [
        { name: "Dashboard", icon: <FaTachometerAlt /> },
        { name: "Album", icon: <FaMusic /> },
        { name: "Artist", icon: <FaUser /> },
        { name: "Sound", icon: <FaHeadphones /> },
        { name: "Profile", icon: <FaUser /> },
        { name: "Favorite", icon: <FaHeart /> },
    ];

    if (role === "artist") {
        menuItems.push(
            {
                name: "Create Song",
                icon: <FaPlusCircle />,
            },
            {
                name: "Create Album",
                icon: <FaPlusCircle />,
            },
            { name: "Own", icon: <FaMusic /> }
        );
    }

    let page;
    switch (active) {
        case "Dashboard":
            page = <Dashboard />;
            break;
        case "Album":
            page = <Album />;
            break;
        case "Artist":
            page = <Artist />;
            break;
        case "Sound":
            page = <Sound />;
            break;
        case "Profile":
            page = <Profile />;
            break;
        case "Favorite":
            page = <Favorite />;
            break;
        case "Create Song":
            page = <CreateSong />;
            break;
        case "Create Album":
            page = <CreateAlbum />;
            break;
        case "Own":
            page = <OwnProduct />;
            break;
        default:
            page = <div>Page not found</div>;
    }

    return (
        <div className="h-full flex gap-4">
            <div className="w-64 h-screen bg-[#0E1B31] text-white flex flex-col">
                <div className="flex items-center justify-center mt-6 mb-8">
                    <AppTitle />
                </div>
                <div className="px-6">
                    <h2 className="text-base mb-4">Main Menu</h2>
                    <ul>
                        {menuItems.map((item) => (
                            <li
                                key={item.name}
                                className={`flex items-center space-x-2 px-3 py-4 rounded-md cursor-pointer 
                            ${
                                active === item.name
                                    ? "text-[#B6FF52]"
                                    : "text-gray-300"
                            }`}
                                onClick={() => {
                                    setActive(item.name);
                                }}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="text-sm">{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {page}
        </div>
    );
};

export default SideBar;
