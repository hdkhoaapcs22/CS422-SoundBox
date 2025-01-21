import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FiEyeOff } from "react-icons/fi";

const Input = ({
    label,
    type,
    placeholder,
    value,
    onChangeValue,
    isPassword = false,
    callbackHiddenPassword,
    isHiddenPassword,
}) => {
    return (
        <div className="relative flex flex-col">
            <label className="block text-gray-300">{label}</label>
            <input
                type={
                    isPassword
                        ? !isHiddenPassword
                            ? "text"
                            : "password"
                        : type
                }
                placeholder={placeholder}
                className="w-full mt-1 mb-4 p-3 bg-transparent border border-[#B6FF52] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-400 "
                value={value}
                onChange={(e) => onChangeValue(e.target.value)}
                required
            />
            {isPassword && (
                <span className="absolute right-3 top-10  text-gray-400 cursor-pointer">
                    {isHiddenPassword ? (
                        <FiEyeOff size={24} onClick={callbackHiddenPassword} />
                    ) : (
                        <IoEyeOutline
                            size={24}
                            onClick={callbackHiddenPassword}
                        />
                    )}
                </span>
            )}
        </div>
    );
};

export default Input;
