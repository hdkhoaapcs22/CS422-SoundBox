import React from "react";
import AppTitle from "./AppTitle";

const Footer = () => {
  return (
    <div className="pt-10 px-4 md:px-10 lg:px-20 mt-14 bg-[#162945] py-12 w-full overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        <div className="w-full md:w-1/3 mb-8 md:mb-0 text-white">
          <AppTitle iconSize={48} textSize={30} />
          <p className="mt-5 text-gray-400">Copyright © 2022.</p>
          <p className="mt-2 text-gray-400">All Right Reserved.</p>
        </div>
        <div className="w-full md:w-1/5 mb-8 md:mb-0">
          <p className="text-xl font-bold mb-4 text-white">Page Menus</p>
          <ul className="flex flex-col gap-2 text-gray-400">
            <a href="#Home" className="hover:text-white">
              Home
            </a>
            <a href="intro-album" className="hover:text-white">
              Album
            </a>
            <a href="intro-artist" className="hover:text-white">
              Artist
            </a>
            <a href="#" className="hover:text-white">
              Sound
            </a>
          </ul>
        </div>
        <div className="w-full md:w-1/5 mb-8 md:mb-0">
          <p className="text-xl font-bold mb-4 text-white">Community</p>
          <ul className="flex flex-col gap-2 text-[#D6D6D8]">
            <li>For Artist</li>
            <li>Developer</li>
            <li>Ads</li>
            <li>Investor</li>
            <li>Vendor</li>
          </ul>
        </div>
        <div className="w-full md:w-1/5 mb-8 md:mb-0">
          <p className="text-xl font-bold mb-4 text-white">Term& Condition</p>
          <ul className="flex flex-col gap-2 text-[#D6D6D8]">
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="w-full md:w-1/5 md:mb-0">
          <p className="text-xl font-bold mb-4 text-white">SoundMedia</p>
          <ul className="flex flex-col gap-2 text-[#D6D6D8]">
            <li>Twitter</li>
            <li>Tiktok</li>
            <li>Facebook</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
