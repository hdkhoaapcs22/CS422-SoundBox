import { PiDownloadFill } from "react-icons/pi";
import { IoVolumeMedium } from "react-icons/io5";
import { FaCompass } from "react-icons/fa6";

const TopTierFeature = () => {
    const features = [
        {
            icon: <PiDownloadFill size={30} />,
            title: "Play Millions Of Song Available",
            description:
                "All songs and musics available in from around the world, from old generation to the new,",
        },
        {
            icon: <IoVolumeMedium size={30} />,
            title: "Listen Across All Your Devices",
            description:
                "Wherever you go online, we got your back. You only need one account to sync through all your devices.",
        },
        {
            icon: <FaCompass size={30} />,
            title: "Download All Your Favorite Tracks",
            description:
                "Wherever you go online, we got your back. You only need one account to sync through all your devices.",
        },
    ];

    return (
        <div className=" text-white py-16 items-center">
            <div className="flex gap-36  justify-center">
                <div className="text-4xl font-bold w-72 justify-start ">
                    OUR TOPTIER FEATURES
                </div>
                <p className="justify-start mb-8 w-[420px] text-base ">
                    Soundbox is a streaming service that allows you to listen to
                    millions of songs. Its great features include the ability to
                    download your favorite tracks and play them offline, lyrics
                    in real time, listening across all your favorite device.
                </p>
            </div>

            <div className="flex gap-10 mx-52">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="min-w-[300px] bg-[#162A47] shadow-lg text-white rounded-2xl px-6 py-12 "
                    >
                        <div className="items-center gap-4 mb-10">
                            <div className="relative w-14 h-14 rounded-full object-cover border-2 border-blue-400 bg-gradient-to-br from-[#F5F5F533] to-[#D9D9D91A]">
                                <div className="absolute top-[11px] left-[12.2px] size-10">
                                    {feature.icon}
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl font-bold pt-6">
                                    {feature.title}
                                </p>
                                <p className="text-sm text-white/70 pt-4">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopTierFeature;
