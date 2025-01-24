import React from "react";
import assets from "../assets/assets";

const ShortUserInfo = ({ name, email }) => {
    return (
        <div className="flex absolute right-0 top-0 p-6 gap-4 items-center">
            <img
                src={assets.defaultAvatarUser}
                alt="avatar"
                className="w-7 h-7 rounded-full"
            />
            <div className="flex flex-col">
                <span className="font-bold text-lg">{name}</span>
                <span>{email}</span>
            </div>
        </div>
    );
};

export default ShortUserInfo;
