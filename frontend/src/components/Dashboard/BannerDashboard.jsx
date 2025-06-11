import React, { useState } from "react";
import assets from "../../assets/assets";
const BannerDashboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    {
      image: assets.kpop,
      title: "POP!",
      artist: "Im Nayeon",
      plays: "2450",
      likes: "922",
      shares: "4349",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className="flex flex-col w-full px-10 pb-10 text-white overflow-hidden">
      <h3 className="text-2xl justify-start font-semibold mb-4">
        Hello, Good Morning 👋
      </h3>
      <div className="relative flex items-center bg-gradient-to-b from-[#A4E0FF] to-[#206588] rounded-lg shadow-md">
        <img
          src={assets.left_arrow_button}
          alt="Previous"
          className="absolute left-10 w-12 h-12 cursor-pointer opacity-70 hover:opacity-100 transition"
          onClick={handlePrev}
        />
        <img
          src={banners[currentIndex].image}
          alt="Banner"
          className="h-[200px] object-cover rounded-lg"
        />
        <img
          src={assets.right_arrow_button}
          alt="Next"
          className="absolute right-10 w-12 h-12 cursor-pointer opacity-70 hover:opacity-100 transition"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default BannerDashboard;
