import React from "react";
import AppTitle from "./AppTitle";

const Footer = () => {
    return (
        <div>
            <div className="px-10 grid grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-2 mt-14 text-sm bg-[#162945] py-12">
                <div className="flex flex-col gap-1 text-white pl-28">
                    <AppTitle iconSize={48} textSize={30} />
                    <p>Copyright @ 2022.</p>
                    <p>All Right Reserved.</p>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5 text-white">
                        Page menus
                    </p>
                    <ul className="flex flex-col gap-1 text-[#D6D6D8]">
                        <li>Home</li>
                        <li>Album</li>
                        <li>Artist</li>
                        <li>Sound</li>
                    </ul>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5 text-white">
                        Community
                    </p>
                    <ul className="flex flex-col gap-1 text-[#D6D6D8]">
                        <li>For Artist</li>
                        <li>Developer</li>
                        <li>Ads</li>
                        <li>Investor</li>
                        <li>Vendor</li>
                    </ul>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5 text-white">
                        Term& Condition
                    </p>
                    <ul className="flex flex-col gap-1 text-[#D6D6D8]">
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5 text-white">
                        SoundMedia
                    </p>
                    <ul className="flex flex-col gap-1 text-[#D6D6D8]">
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
