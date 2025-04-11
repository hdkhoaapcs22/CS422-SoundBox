import React from "react";
import TopTracks from "../components/intro_sound/TopTrack";
import Download from "../components/intro_album/Download";
import PopularCategory from "../components/intro_sound/PopularCategory";
import SoundBanner from "../components/intro_sound/SoundBanner";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const IntroSound = () => {
    const [rankingData, setRankingData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRankingData = async () => {
            try {
                const response = await axios.get(
                    import.meta.env.VITE_BACKEND_URL + "/api/artist/top-5"
                );
                console.log(response.data.data);
                setRankingData(response.data.data);
            } catch (err) {
                toast.error("Failed to fetch ranking data: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRankingData();
    }, []);
    return (
        <div className="flex flex-col w-full overflow-hidden">
            <SoundBanner />
            <TopTracks rankingData={rankingData} loading={loading} />
            <PopularCategory />
            <Download />
        </div>
    );
};

export default IntroSound;
