import React, { useState } from "react";
import TodayTopChart from "../../components/Dashboard/TodayTopChart";
import NewAlbum from "../../components/Album/NewAlbum";
import AlbumView from "../../components/Album/AlbumView";
const Album = () => {
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const handleAlbumSelect = (albumId) => {
    setSelectedAlbumId(albumId);
  };
  const handleBack = () => {
    setSelectedAlbumId(null);
  };
  return (
    <div className="w-screen h-[88%] flex flex-row overflow-hidden">
      {selectedAlbumId ? (
        <div className="w-[85%] overflow-y-auto scrollbar-hide">
          <AlbumView albumId={selectedAlbumId} onBack={handleBack} />
        </div>
      ) : (
        <>
          <div className="w-[60%] h-full overflow-y-auto scrollbar-hide">
            <NewAlbum onAlbumSelect={handleAlbumSelect} />
          </div>
          <div className="w-[25%] h-full flex justify-center overflow-hidden">
            <TodayTopChart />
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Album;
