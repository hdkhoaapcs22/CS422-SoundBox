import { useState, useContext } from "react";
import { AppContext } from "../../global/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import Dashboard from "../../pages/listener/Dashboard";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { BsSoundwave } from "react-icons/bs";

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
    { name: "Album", icon: <BsSoundwave />, path: "/album" },
    { name: "Artist", icon: <BiSolidBarChartAlt2 />, path: "/artist" },
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
      { name: "Own", icon: <FaMusic />, path: "/own-product" },
      { name: "Edit Profile", icon: <FaUser />, path: "/edit-profile" }
    );
  }

  return (
    <div className="w-full bg-[#0E1B31] text-white flex flex-col">
      <div className="flex px-9 mt-6 mb-8">
        <AppTitle />
      </div>
      <div className="px-6">
        <h2 className="text-base px-3 mb-4">Main Menu</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center space-x-3 px-3 py-4 rounded-md cursor-pointer 
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
  );
};

export default SideBar;
