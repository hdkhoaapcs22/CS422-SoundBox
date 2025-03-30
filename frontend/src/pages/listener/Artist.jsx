import React from "react";
import TopArtist from "../../components/intro_artist/TopArtist";
import assets from "../../assets/assets";
import TodayTopChart from "../../components/Dashboard/TodayTopChart";

const Artist = () => {
  const rankingData = [
    {
      rank: "1",
      artist: "Raisa",
      genre: "R&B Soul",
      image: assets.reputation,
    },
    {
      rank: "2",
      artist: "Tulus",
      genre: "Rock",
      image: assets.aespa,
    },
    {
      rank: "3",
      artist: "Hivi",
      genre: "Pop",
      image: assets.pink_venom,
    },
    {
      rank: "4",
      artist: "Lyodra",
      genre: "Pop",
      image: assets.harry_house,
    },
    {
      rank: "5",
      artist: "RAN",
      genre: "R&B Funk",
      image: assets.pink_venom,
    },
  ];
  return (
    <div className="w-screen flex flex-row overflow-hidden">
      <div className="w-[60%] h-full overflow-y-auto scrollbar-hide">
        <TopArtist title="Top 5 Artist This Year" rankingData={rankingData} />
      </div>
      <div className="w-[25%] h-full flex justify-center overflow-hidden">
        <TodayTopChart />
      </div>
    </div>
  );
};

export default Artist;
