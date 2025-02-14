import React from "react";
import album_img from "../../assets/album.png";
const PopularAlbum = () => {
  return (
    <div className="flex flex-col mt-20 px-10 w-full items-center text-center">
      <h2 className="text-3xl text-white font-semibold after:block after:mt-5 after:w-40 after:h-[2px] after:bg-neonGreen after:mx-auto">
        POPULAR ALBUM
      </h2>
      <div className="flex flex-row gap-4 mt-10 w-full justify-center">
        {/* 1st Album */}
        <div className="flex flex-col border items-center bg-[#162A47] border-[#345409] text-white rounded-lg gap-5 py-20 px-10 mt-8">
          <span className="text-neonGreen text-3xl font-bold after:block after:mt-5 after:w-10 after:h-[0.5px] after:bg-gray-500 after:mx-auto">
            01.
          </span>
          <div
            className="flex flex-col gap-2"
            style={{ writingMode: "sideways-rl" }}
          >
            <h3 className="text-2xl font-semibold self-start">Abbey Road</h3>
            <span className="text-sm text-gray-400 self-start">
              the beatles
            </span>
          </div>
        </div>

        {/* 2nd Album*/}
        <div className="relative w-1/3 rounded-lg border border-[#345409] bg-[#162A47] overflow-hidden">
          {/* Album Cover */}
          <div className="relative">
            <img
              src={album_img}
              alt="Album Cover"
              className="w-full h-52 object-cover"
            />
            {/* Album Info */}
            <div className="p-6 text-left text-white">
              <span className="text-neonGreen font-bold text-3xl">02.</span>
              <h3 className="text-2xl font-semibold">Seven</h3>
              <span className="text-gray-400 text-sm">martin garrix</span>
              <p className="mt-2 text-gray-300 text-sm">
                Seven is the third extended play by Dutch electronic musician
                Martin Garrix. Released on 28 October 2016, the EP was released
                via Stmpd Rcrds, and features collaborations with Mesto, Jay
                Hardway, Julian Jordan, Matisse & Sadko and Florian Picasso, as
                well as writing contributions from Giorgio Tuinfort among
                others.
              </p>
            </div>
          </div>
        </div>

        {/* 3rd Album (Right - Vertical) */}
        <div className="flex flex-col border items-center bg-[#162A47] border-[#345409] text-white rounded-lg gap-5 py-20 px-10 mt-8">
          <span className="text-neonGreen text-3xl font-bold after:block after:mt-5 after:w-10 after:h-[0.5px] after:bg-gray-500 after:mx-auto">
            03.
          </span>
          <div
            className="flex flex-col gap-2"
            style={{ writingMode: "sideways-rl" }}
          >
            <h3 className="text-2xl font-semibold self-start">
              Kecanduan Kamu
            </h3>
            <span className="text-sm text-gray-400 self-start">nassar</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularAlbum;
