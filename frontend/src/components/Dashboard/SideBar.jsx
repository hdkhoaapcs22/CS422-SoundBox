import { useState, useContext } from "react";
import { AppContext } from "../../global/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import Dashboard from "../../pages/listener/Dashboard";

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
    const { role } = useContext(AppContext);

    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
        { name: "Album", icon: <FaMusic />, path: "/album" },
        { name: "Artist", icon: <FaUser />, path: "/artist" },
        { name: "Sound", icon: <FaHeadphones />, path: "/sound" },
        { name: "Profile", icon: <FaUser />, path: "/profile" },
        { name: "Favorite", icon: <FaHeart />, path: "/favorite" },
    ];

    if (role === "artist") {
        menuItems.push(
            {
                name: "Create Song",
                icon: <FaPlusCircle />,
                path: "/create-song",
            },
            {
                name: "Create Album",
                icon: <FaPlusCircle />,
                path: "/create-album",
            },
            { name: "Own", icon: <FaMusic />, path: "/own-product" }
        );
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
                                        location.pathname === item.path
                                            ? "text-[#B6FF52]"
                                            : "text-gray-300"
                                    }`}
                                onClick={() => navigate(item.path)}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="text-sm">{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
