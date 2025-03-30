import { useState } from "react";
import { FaTachometerAlt, FaPlusCircle } from "react-icons/fa";
import AppTitle from "../../AppTitle";
import { useLocation, useNavigate } from "react-router-dom";

const AdminSideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin/dashboard",
    },
    {
      name: "Add Artist Account",
      icon: <FaPlusCircle />,
      path: "/admin/add-artist",
    },
  ];

  return (
    <div className="h-full bg-[#0E1B31] text-white flex flex-col gap-4">
      <div className="flex px-9 mt-6 mb-8">
        <AppTitle />
      </div>
      <div className="px-6">
        <h2 className="text-base px-3 mb-4">Main Menu</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center space-x-2 pl-3 py-4 rounded-md cursor-pointer flex-grow
                            ${
                              location.pathname === item.path
                                ? "text-[#B6FF52]"
                                : "text-gray-300"
                            }`}
              onClick={() => {
                navigate(item.path);
              }}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm whitespace-nowrap">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSideBar;
