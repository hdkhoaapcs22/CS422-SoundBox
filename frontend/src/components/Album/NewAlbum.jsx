import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NewAlbum = ({ onAlbumSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const [albums, setAlbums] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchNewAlbums = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/album/new-album"
        );
        setAlbums(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewAlbums();
  }, []);

  useEffect(() => {
    const updateCardsToShow = () => {
      setCardsToShow(window.innerWidth >= 1024 ? 4 : 1);
    };
    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(() =>
      currentIndex + 1 >= songs.length ? 0 : currentIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  if (loading) return <p>Loading new releases...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col text-white px-10 pb-5 w-full overflow-hidden">
      {/* Title and Navigation */}
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-2xl font-bold">New Album</h3>
        <div className="flex flex-row text-[#B6FF52] gap-4">
          <button
            className="cursor-pointer hover:bg-blue-950 p-2 rounded-full"
            onClick={prevSlide}
          >
            <IoArrowBackOutline size={20} />
          </button>
          <button
            className="cursor-pointer hover:bg-blue-950 p-2 rounded-full"
            onClick={nextSlide}
          >
            <IoArrowForwardOutline size={20} />
          </button>
        </div>
      </div>

      {/* Album Cards */}
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
            width: `${albums.length * (100 / cardsToShow)}%`,
          }}
        >
          {albums.map((album, index) => (
            <div
              key={index}
              onClick={() => onAlbumSelect(album._id)}
              className="flex flex-col w-[calc(100% / 4)] p-3 items-center bg-transparent rounded-lg cursor-pointer hover:bg-slate-800"
            >
              <img
                src={album.image}
                alt={album.name}
                className="w-40 h-40 object-cover rounded-lg"
              />
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-col pt-2">
                  <p className="text-sm font-bold">{album.name}</p>
                  <p className="text-xs">
                    {album.artistID.name || "Unknown Artist"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewAlbum;
