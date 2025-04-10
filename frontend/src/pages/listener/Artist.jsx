import React, { useState, useEffect } from "react";
import TopArtist from "../../components/intro_artist/TopArtist";
import TodayTopChart from "../../components/Dashboard/TodayTopChart";
import { fetchTopArtists } from "../../services/artistServices";
import ArtistView from "../../components/Artist/ArtistView";
const Artist = () => {
  const [rankingData, setRankingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArtistId, setSelectedArtistId] = useState(null);

  const handleBack = () => {
    setSelectedArtistId(null);
  };
  useEffect(() => {
    const getTopArtists = async () => {
      const topArtists = await fetchTopArtists();
      const formattedData = topArtists.map((item, index) => ({
        rank: index + 1,
        artistId: item.artistInfo._id,
        artist: item.artistInfo.name,
        image: item.artistInfo.avatarUrl,
      }));
      setRankingData(formattedData);
      setIsLoading(false);
    };

    getTopArtists();
  }, []);

  const selectedArtist = rankingData.find(
    (a) => a.artistId === selectedArtistId
  );

  return (
    <div className="w-screen h-[88%] flex flex-row overflow-hidden">
      {selectedArtistId && selectedArtist ? (
        <div className="w-[85%] overflow-y-auto scrollbar-hide">
          <ArtistView artist={selectedArtist} onBack={handleBack} />
        </div>
      ) : (
        <>
          <div className="w-[60%] h-full overflow-y-auto scrollbar-hide">
            {isLoading ? (
              <div className="text-white text-center w-full mt-20">
                Loading Top Artists...
              </div>
            ) : (
              <TopArtist
                title="Top 5 Artists This Year"
                rankingData={rankingData}
                layout="left"
                handleSelectArtist={setSelectedArtistId}
              />
            )}
          </div>
          <div className="w-[25%] h-full flex justify-center overflow-hidden">
            <TodayTopChart />
          </div>
        </>
      )}
    </div>
  );
};

export default Artist;
