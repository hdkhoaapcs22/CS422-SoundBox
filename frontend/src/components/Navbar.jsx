import React from "react";
import { Link, NavLink } from "react-router-dom";
import AppTitle from "./AppTitle";

const Navbar = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center justify-between px-4 py-4 md:px-8 text-white font-medium md:flex">
        <AppTitle />
        <div className="md:flex gap-24 text-white">
          <NavLink to="/">
            <p className="hover:text-neonGreen">HOME</p>
          </NavLink>

          <NavLink to="/intro-album">
            <p className="hover:text-neonGreen">ALBUM</p>
          </NavLink>

          <NavLink to="/intro-artist">
            <p className="hover:text-neonGreen">ARTIST</p>
          </NavLink>

          <NavLink to="/intro-sound">
            <p className="hover:text-neonGreen">SOUND</p>
          </NavLink>
        </div>

        <div className="rounded-full items-center bg-neonGreen py-2 px-8 cursor-pointer text-black">
          <Link to="/login">
            <p>JOIN</p>
          </Link>
        </div>
      </div>

      <div className="w-full h-[2px] bg-[#3566C7]"></div>
    </div>
  );
};

export default Navbar;
