import React from "react";
import assets from '../../assets/assets';

const Download = () => {
    const downloadSection = [
        {
            image: assets.appleIcon,
            alt: "Apple Icon",
            message: "Download on the",
            platform: "App Store",
        },
        {
            image: assets.chplayIcon,
            alt: "Google Play Icon",
            message: "Get it on",
            platform: "Google Play",
        },
        {
            image: assets.microsoftIcon,
            alt: "Microsoft Icon",
            message: "Get it from",
            platform: "Microsoft",
        },
    ];

    return (
        <div className="text-center mt-8 mb-20 text-white">
            {/* Heading */}
            <h2 className="text-5xl font-bold mb-4">
                LISTEN YOUR MUSIC EASILY
            </h2>
            <div className="text-lg text-white/80 mb-16">
                <p>
                    You can download the app on available platforms. After that,
                    you can
                </p>
                <p>create an account in the applications.</p>
            </div>

            {/* Download Section */}
            <div className="flex items-center justify-center gap-6 text-black">
                {downloadSection.map((section, index) => (
                    <div
                        key={index}
                        className="flex gap-4 items-center justify-center bg-white rounded-xl px-4 py-2 min-w-[200px]"
                    >
                        <img
                            src={section.image}
                            className="w-8 h-8 object-cover gap-2"
                        />
                        <div className="text-left">
                            <p className="text-base">{section.message}</p>
                            <p className="text-xl font-medium">
                                {section.platform}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Download;
