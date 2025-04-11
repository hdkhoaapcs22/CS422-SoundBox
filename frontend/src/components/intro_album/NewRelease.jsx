import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const NewRelease = () => {
    const [newRelease, setNewRelease] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchNewReleases = async () => {
            try {
                const response = await axios.get(
                    import.meta.env.VITE_BACKEND_URL +
                        "/api/songs/new-releases",
                    {
                        params: {
                            limit: 4,
                        },
                    }
                );
                setNewRelease(response.data);
            } catch (err) {
                toast.error("Failed to fetch new releases: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNewReleases();
    }, []);

    return (
        <div className="flex flex-col mt-20 items-center justify-center w-full overflow-hidden">
            <h3 className="text-white text-lg mb-5">NEW RELEASES</h3>
            <h1 className="text-white text-4xl font-bold">
                NEW RELEASE FOR YOU
            </h1>
            {!loading && (
                <>
                    <div className="flex flex-row gap-4 my-20">
                        {newRelease.map((album, index) => (
                            <div
                                key={index}
                                className="bg-white bg-opacity-10 rounded-3xl overflow-hidden shadow-lg w-64 
            flex-shrink-0 border-[0.5px] border-white transition-transform duration-300 
            ease-in-out hover:scale-105 cursor-pointer"
                            >
                                <img
                                    src={album.imageUrl}
                                    alt={album.title}
                                    className="w-full h-80 object-cover"
                                />
                                <div className="px-6 py-4 text-white">
                                    <h3 className="font-semibold">
                                        {album.title}
                                    </h3>
                                    <p>{album.artist}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row justify-start text-white gap-36">
                        <div className="flex flex-col gap-5">
                            <h1 className="text-white text-2xl font-bold">
                                MOST RECOMMENDED
                            </h1>
                            {newRelease.map((album, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-4 mb-6 group cursor-pointer"
                                >
                                    <h3 className="font-bold">0{index + 1}</h3>
                                    <img
                                        src={album.imageUrl}
                                        alt={album.title}
                                        className="w-28 h-28 rounded-sm transition-transform group-hover:scale-105"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {album.title}
                                        </h3>
                                        <p className="text-sm text-gray-300">
                                            {album.artist}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-8">
                                            {album.year}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-5">
                            <h1 className="text-white text-2xl font-bold">
                                MOST LISTENED
                            </h1>
                            {newRelease.map((album, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-4 mb-6 group cursor-pointer"
                                >
                                    <h3 className="font-bold">0{index + 1}</h3>
                                    <img
                                        src={album.imageUrl}
                                        alt={album.title}
                                        className="w-28 h-28 rounded-sm transition-transform group-hover:scale-105"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {album.title}
                                        </h3>
                                        <p className="text-sm text-gray-300">
                                            {album.artist}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-8">
                                            {album.year}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewRelease;
