import React, { useState, useEffect } from "react";
import assets from "../assets/assets";
import Download from "../components/home/Download";
import RisingStar from "../components/intro_artist/RisingStar";
import TopArtist from "../components/intro_artist/TopArtist";

import axios from "axios";
import { toast } from "react-toastify";

const IntroArtist = () => {
    const [rankingData, setRankingData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRankingData = async () => {
            try {
                const response = await axios.get(
                    import.meta.env.VITE_BACKEND_URL + "/api/artist/top-5"
                );
                setRankingData(response.data.data);
            } catch (err) {
                toast.error("Failed to fetch ranking data: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRankingData();
    }, []);

    const banner = [
        {
            artist: "Paramore",
            title: "This Is Why",
            image: assets.banner_1,
        },
        {
            artist: "tlinh",
            title: "ái",
            image: assets.banner_2,
        },
        {
            artist: "Obito",
            title: "Đánh đổi",
            image: assets.banner_3,
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex == 0 ? 3 - 1 : prevIndex - 1
        );
    };
    return (
        <div className="flex flex-col w-full overflow-hidden">
            <div
                className="relative min-h-[85svh] mb-10 bg-cover bg-center flex transition-all duration-500 ease-in-out items-center justify-center"
                style={{
                    backgroundImage: `url(${
                        banner[currentIndex].image || assets.background_image
                    })`,
                }}
            >
                <img
                    src={assets.left_arrow_button}
                    alt="Previous"
                    className="absolute left-24 w-12 h-12 cursor-pointer opacity-70 hover:opacity-100 transition"
                    onClick={handlePrev}
                />
                <div className="container text-center text-white flex flex-col">
                    <p className="text-5xl font-semibold mb-5">
                        {banner[currentIndex].artist} Comeback Hits
                    </p>
                    <p className="text-7xl font-bold">
                        {banner[currentIndex].title}
                    </p>
                </div>
                <img
                    src={assets.right_arrow_button}
                    alt="Next"
                    className="absolute right-24 w-12 h-12 cursor-pointer opacity-70 hover:opacity-100 transition"
                    onClick={handleNext}
                />
            </div>
            <RisingStar rankingData={rankingData} loading={loading} />
            <TopArtist
                title="Top 5 Artists This Year"
                rankingData={rankingData}
                loading={loading}
            />
            <Download />
        </div>
    );
};

export default IntroArtist;
