import React from "react";
import { useState } from "react";
import assets from "../../assets/assets";

const SoundBanner = () => {
  const banner = [
    {
      artist: "tlinh",
      title: "Sound of V-POP",
      image: assets.sound_banner_1,
    },
    {
      artist: "G-Dragon",
      title: "Sound of K-POP",
      image: assets.sound_banner_2,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex == 0 ? 3 - 1 : prevIndex - 1));
  };
  return (
    <div
      className="relative min-h-[85svh] mb-10 bg-cover bg-center flex transition-all duration-500 ease-in-out items-center justify-center"
      style={{
        backgroundImage: `url(${
          banner[currentIndex].image || assets.background_image
        })`,
      }}
    >
      <div className="container ml-20 text-white flex flex-col">
        <p className="text-6xl font-semibold mb-5">
          {banner[currentIndex].title}
        </p>
        <p className="text-8xl font-bold">{banner[currentIndex].artist}</p>
      </div>
      <div className="absolute bottom-10 left-20 flex space-x-4">
        <img
          src={assets.left_arrow_button}
          alt="Previous"
          className="w-12 h-12 cursor-pointer opacity-70 hover:opacity-100 transition"
          onClick={handlePrev}
        />
        <img
          src={assets.right_arrow_button}
          alt="Next"
          className="w-12 h-12 cursor-pointer opacity-70 hover:opacity-100 transition"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default SoundBanner;
