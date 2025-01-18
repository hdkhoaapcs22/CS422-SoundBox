import React from "react";
import { Link, NavLink } from "react-router-dom";
import AppTitle from "./AppTitle";

const Navbar = () => {
    return (
        <div className="w-full flex flex-col">
            <div className="flex items-center justify-between py-5 font-medium px-10 gap-20 text-sm text-white">
                <AppTitle />

                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                </NavLink>

                <NavLink
                    to="/intro-album"
                    className="flex flex-col items-center gap-1"
                >
                    <p>ALBUM</p>
                </NavLink>

                <NavLink
                    to="/intro-artist"
                    className="flex flex-col items-center gap-1"
                >
                    <p>ARTIST</p>
                </NavLink>

                <NavLink
                    to="/intro-sound"
                    className="flex flex-col items-center gap-1"
                >
                    <p>SOUND</p>
                </NavLink>
                <div className="gap-6 rounded-lg items-center bg-neonGreen py-1 px-6 cursor-pointer text-black">
                    <Link to="/login">
                        <p>JOIN</p>
                    </Link>
                </div>
            </div>

            <div className="w-full h-[2px] bg-[#3566C7] my-2"></div>
        </div>
    );
};

export default Navbar;
