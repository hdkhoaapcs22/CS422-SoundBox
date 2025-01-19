import React from "react";
import assets from "../../assets/assets";

const TopSongFigure = () => {
    return (
        <div className="max-w-7xl flex mx-auto gap-10 text-white mb-20"> 
            <div className="relative pr-14">
                <div className="w-64 h-64 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src={assets.TopSongFigure1}
                        alt="Background Art"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute top-14 left-12 w-64 h-64 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src={assets.TopSongFigure2}
                        alt="Microphone"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="text-left">
                <h2 className="text-4xl font-bold leading-snug">
                    MANY TOP SONGS THAT <br /> CAN BE PLAYED FROM <br /> ALL
                    COUNTRIES
                </h2>
                <p className="mt-4 text-white/70">
                    Find your favorite music playlist easily and quickly that
                    can be accessed anytime, anywhere, and anymore.
                </p>
                <div className="flex justify-center md:justify-start mt-8 gap-16">
                    <div>
                        <p className="text-4xl font-medium">500K+</p>
                        <p className="text-white/70">Famous Singer</p>
                    </div>
                    <div>
                        <p className="text-4xl font-medium">240K+</p>
                        <p className="text-white/70">Playlist Song</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopSongFigure;
