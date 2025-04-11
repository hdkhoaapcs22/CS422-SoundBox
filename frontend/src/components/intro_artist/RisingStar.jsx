import React from "react";
import assets from "../../assets/assets";
import { IoHeartOutline } from "react-icons/io5";

const RisingStar = ({rankingData, loading}) => {
    
    return (
        <div className="flex flex-col text-white items-center w-full mb-20 overflow-hidden">
            <h2 className="text-4xl font-bold">Rising Star</h2>
            <table className="text-white w-[70%] my-10">
                <thead>
                    <tr className="text-left border-b border-gray-700 text-gray-300">
                        <th className="py-2 px-4">#</th>
                        <th className="py-2 px-4">Artist</th>
                        <th className="py-2 px-4">Popular Hits</th>
                        <th className="py-2 px-4">Monthly Listeners</th>
                        <th className="py-2 px-4">Likes</th>
                    </tr>
                </thead>
                {!loading && (
                    <tbody>
                        {rankingData.map((item, index) => (
                            <tr
                                key={index + 1}
                                className="hover:bg-[#05439f] hover:bg-opacity-20 cursor-pointer"
                            >
                                <td className="py-4 px-4">{index + 1}</td>
                                <td className="py-4 px-4 flex items-center space-x-4">
                                    <img
                                        src={item.artistInfo.avatarUrl}
                                        className="w-10 h-10 rounded-lg"
                                    />
                                    <span>{item.artistInfo.name}</span>
                                </td>
                                <td className="py-4 px-4">{item.title}</td>
                                <td className="py-4 px-4">{item.totalPlays}</td>
                                <td className="py-4 px-4 flex items-center space-x-2">
                                    <IoHeartOutline className="w-5 h-5" />
                                    <span>{item.likes}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
            <p className="text-2xl mb-2">UPCOMING TOUR</p>
            <p className="text-4xl font-bold mb-10">ARTIST HIGHLIGHT</p>
            <img src={assets.artist_highlight} alt="" className="w-[70%]" />
        </div>
    );
};

export default RisingStar;
