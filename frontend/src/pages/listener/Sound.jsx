import React, { useState } from "react";
import assets from "../../assets/assets";
import SoundView from "../../components/Sound/SoundView";

const Sound = () => {
  const categories = [
    {
      title: "R&B",
      image: assets.rnb,
      bgColor: "bg-gradient-to-b from-[#FF640D] to-[#FF8F51]",
    },
    {
      title: "Ballad",
      image: assets.ballad,
      bgColor: "bg-gradient-to-b from-[#D8DC1B] to-[#E2E550]",
    },
    {
      title: "Jazz",
      image: assets.jazz,
      bgColor: "bg-gradient-to-b from-[#6F2D0C] to-[#9A5532]",
    },
    {
      title: "K-POP",
      image: assets.kpop,
      bgColor: "bg-gradient-to-b from-[#58C6FF] to-[#D1EFFF]",
    },
    {
      title: "POP",
      image: assets.pop,
      bgColor: "bg-gradient-to-b from-[#7B7B7B] to-[#CACACA]",
    },
    {
      title: "ROCK",
      image: assets.rock,
      bgColor: "bg-gradient-to-b from-[#064BB5] to-[#619EFD]",
    },
    {
      title: "EDM",
      image: assets.edm,
      bgColor: "bg-gradient-to-b from-[#406709] to-[#9FE145]",
    },
    {
      title: "HIP-HOP",
      image: assets.hiphop,
      bgColor: "bg-gradient-to-b from-[#6F2D0C] to-[#D98459]",
    },
  ];

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  const handleBack = () => {
    setSelectedGenre(null);
  };

  if (selectedGenre) {
    return (
      <div className="h-[88%] px-10 pb-10 overflow-y-auto scrollbar-hide">
        <SoundView genre={selectedGenre} onBack={handleBack} />
      </div>
    );
  } else {
  }

  return (
    <div className="w-screen h-[88%] flex flex-col px-10 pb-10 overflow-y-auto scrollbar-hide">
      <h1 className="text-white text-4xl font-bold mb-10">
        Browse All Sound of Music
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`relative group rounded-xl overflow-hidden aspect-square ${category.bgColor} cursor-pointer`}
            onClick={() => handleGenreClick(category.title)}
          >
            {/* Background Image */}
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />

            {/* Text Overlay */}
            <h3 className="absolute bottom-4 left-4 text-white text-3xl md:text-4xl font-extrabold drop-shadow-md">
              {category.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sound;
