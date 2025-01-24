import { useState } from "react";
import { FaTachometerAlt, FaPlusCircle } from "react-icons/fa";
import AdminDashboard from "../../../pages/admin/AdminDashboard";
import CreateArtistAccount from "../../../pages/admin/CreateArtistAccount";
import AppTitle from "../../AppTitle";

const AdminSideBar = () => {
    const [active, setActive] = useState("Dashboard");

    const menuItems = [
        { name: "Dashboard", icon: <FaTachometerAlt /> },
        { name: "Add Artist Account", icon: <FaPlusCircle /> },
    ];

    let page;
    switch (active) {
        case "Dashboard":
            page = <AdminDashboard />;
            break;
        case "Add Artist Account":
            page = <CreateArtistAccount />;
            break;
        default:
            page = <div>Page not found</div>;
    }

    return (
        <div className="h-full flex gap-4">
            <div className="w-64 h-screen bg-[#0E1B31] text-white flex flex-col shrink-0">
                <div className="flex items-center justify-center mt-6 mb-8">
                    <AppTitle />
                </div>
                <div className="px-6">
                    <h2 className="text-base mb-4">Main Menu</h2>
                    <ul>
                        {menuItems.map((item) => (
                            <li
                                key={item.name}
                                className={`flex items-center space-x-2 pl-3 py-4 rounded-md cursor-pointer flex-grow
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
                                <span className="text-sm whitespace-nowrap">{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {page}
        </div>
    );
};

export default AdminSideBar;
