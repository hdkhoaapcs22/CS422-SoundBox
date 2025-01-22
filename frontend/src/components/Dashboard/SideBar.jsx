import { useState, useContext } from "react";
import { AppContext } from "../../global/AppContext";

import {
    FaTachometerAlt,
    FaMusic,
    FaUser,
    FaHeadphones,
    FaHeart,
    FaPlusCircle,
} from "react-icons/fa";

import AppTitle from "../AppTitle";

const SideBar = () => {
    const [active, setActive] = useState("Dashboard");
    const { role } = useContext(AppContext);

    const menuItems = [
        { name: "Dashboard", icon: <FaTachometerAlt /> },
        { name: "Album", icon: <FaMusic /> },
        { name: "Artist", icon: <FaUser /> },
        { name: "Sound", icon: <FaHeadphones /> },
        { name: "Favorite", icon: <FaHeart /> },
    ];

    if (role === "artist") {
        menuItems.push(
            { name: "Create Sound", icon: <FaPlusCircle /> },
            { name: "Create Album", icon: <FaPlusCircle /> },
            { name: "Own", icon: <FaMusic /> }
        );
    }

    return (
        <div className="h-full w-64 bg-[#0E1B31] text-white flex flex-col">
            <div className="flex items-center justify-center mt-6 mb-8">
                <AppTitle />
            </div>
            <div className="px-6">
                <h2 className="text-base mb-4">Main Menu</h2>
                <ul>
                    {menuItems.map((item, index) => (
                        <li
                            key={item.name}
                            className={`flex items-center space-x-2 px-3 py-4 rounded-md cursor-pointer 
                            ${
                                active === item.name
                                    ? "text-[#B6FF52]"
                                    : "text-gray-300"
                            }`}
                            onClick={() => setActive(item.name)}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-sm">{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default SideBar;
