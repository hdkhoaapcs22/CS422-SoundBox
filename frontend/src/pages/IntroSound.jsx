import React from "react";
import TopTracks from "../components/intro_sound/TopTrack";
import Download from "../components/intro_album/Download";
import PopularCategory from "../components/intro_sound/PopularCategory";
import SoundBanner from "../components/intro_sound/SoundBanner";

const IntroSound = () => {
  return <div className="flex flex-col w-full overflow-hidden">
    <SoundBanner />
    <TopTracks />
    <PopularCategory />
    <Download />
  </div>;
};

export default IntroSound;
