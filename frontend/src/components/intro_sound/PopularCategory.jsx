import React from "react";
import assets from "../../assets/assets";

const PopularCategory = () => {
  const categories = [
    {
      title: "R&B",
      artists:
        "The Weeknd, Agnez Mo, Bunga Citra Lestari, Bibi, Tiara Andini, Marion Jola, Pamungkas...",
      image: assets.rnb,
      bgColor: "bg-gradient-to-b from-[#FF640D] to-[#FF8F51]",
    },
    {
      title: "K-POP",
      artists:
        "Twice, G-Idle, Itzy, BTS, EXO, Stray Kids, NCT, BIBI, IU, PSY, Mamamoo, aespa, IVE, Seventeen, Red Velvet, TXT...",
      image: assets.kpop,
      bgColor: "bg-gradient-to-b from-[#58C6FF] to-[#D1EFFF]",
    },
    {
      title: "POP",
      artists:
        "Sal Priadi, Yura Yunita, Payung Teduh, Nadin Amizah, Kunto Aji, Lyodra, Mahalini, Tiara Andini, Pamungkas...",
      image: assets.pop,
      bgColor: "bg-gradient-to-b from-[#7B7B7B] to-[#CACACA]",
    },
    {
      title: "ROCK",
      artists:
        "Queen, Deep Purple, Gorillaz, Daft Punk, Nirvana, System Of A Down, Bring Me The Horizon...",
      image: assets.rock,
      bgColor: "bg-gradient-to-b from-[#064BB5] to-[#619EFD]",
    },
    {
      title: "EDM",
      artists:
        "Martin Garrix, DJ Snake, DVBBS, ZEDD, Skrillex, DJ Armin, Armin Van Buuren...",
      image: assets.edm,
      bgColor: "bg-gradient-to-b from-[#406709] to-[#9FE145]",
    },
    {
      title: "HIPHOP",
      artists:
        "Lil Pump, XXXTENTACION, Lil Uzi Vert, Offset, Post Malone, Drake, Future, Lil Rafis, Juice WRLD, Young Lex...",
      image: assets.hiphop,
      bgColor: "bg-gradient-to-b from-[#6F2D0C] to-[#D98459]",
    },
  ];
  return (
    <div className="w-1/2 mx-auto py-12 px-4 items-center text-white overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-10">Popular Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`relative flex-col ${category.bgColor} rounded-lg h-[400px] p-6 group`}
          >
            <h3 className="text-white text-3xl font-bold">{category.title}</h3>
            <p className="text-white mt-2 text-sm">{category.artists}</p>
            <img
              src={category.image}
              alt={category.title}
              className="absolute bottom-0 right-0 max-h-[300px] object-contain rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategory;
