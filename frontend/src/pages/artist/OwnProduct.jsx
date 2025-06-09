import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MdFavoriteBorder } from "react-icons/md";
import { AppContext } from "../../global/AppContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const OwnProduct = () => {
    const { userId } = useContext(AppContext);
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [likesOfAlbum, setLikesOfAlbum] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get(
                import.meta.env.VITE_BACKEND_URL +
                    "/api/artist/own-product/" +
                    userId
            );
            if (response.data.success) {
                setSongs(response.data.songs);
                setAlbums(response.data.albums);
                setLikesOfAlbum(response.data.likesOfAlbum);
            } else {
                console.log(response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching music data:", error);
        }
    };

    const handleRemove = async (id, type) => {
        const path = type === "song" ? "delete-song" : "delete-album";
        try {
            if (type === "song") {
                setSongs((prevSongs) =>
                    prevSongs.filter((song) => song._id !== id)
                );
            } else {
                setAlbums((prevAlbums) =>
                    prevAlbums.filter((album) => album._id !== id)
                );
            }
            console.log(id);
            const response = await axios.delete(
                import.meta.env.VITE_BACKEND_URL +
                    "/api/artist/" +
                    path +
                    "/" +
                    userId +
                    "/" +
                    id
            );
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                console.log(response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error removing item:", error);
            toast.error("Error removing item: " + error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full text-white p-10">
            <h2 className="text-2xl font-bold mb-8">YOUR PRODUCT</h2>
            <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] text-gray-400 text-sm font-medium mb-2 border-b border-gray-700 pb-2">
                <div>#</div>
                <div>Sound</div>
                <div>Kind</div>
                <div>Genre</div>
                <div>Likes</div>
                <div>Remove</div>
            </div>
            {songs.map((item, index) => (
                <div
                    key={item._id}
                    className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center text-sm mb-4 py-2 border-b border-gray-700"
                >
                    <span>{index + 1}</span>
                    <Link
                        to={`/song/${item._id}`}
                        className="hover:cursor-pointer hover:underline hover:text-[#B6FF52]"
                    >
                        <div className="flex items-center gap-2">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-10 h-10 rounded-sm"
                            />
                            <span>{item.title}</span>
                        </div>
                    </Link>
                    <div>Song</div>
                    <div>{item.genre}</div>
                    <div className="flex items-center gap-1">
                        <MdFavoriteBorder />
                        <span>{item.likes}</span>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="bg-red-500 p-2 rounded mt-2"
                            onClick={() => handleRemove(item._id, "song")}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}

            {albums.map((item, index) => (
                <div
                    key={item._id}
                    className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center text-sm mb-4 py-2 border-b border-gray-700"
                >
                    <span>{songs.length + index + 1}</span>
                    <Link
                        to={`/album/${item._id}`}
                        state={{ album: item }}
                        className="hover:cursor-pointer hover:underline hover:text-[#B6FF52]"
                    >
                        <div className="flex items-center gap-2">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded-sm"
                            />
                            <span>{item.name}</span>
                        </div>
                    </Link>
                    <div>Album</div>
                    <div></div>
                    <div className="flex items-center gap-1">
                        <MdFavoriteBorder />
                        <span>{likesOfAlbum[index]}</span>
                    </div>

                    <div>
                        <button
                            type="button"
                            className="bg-red-500 text-white p-2 rounded mt-2"
                            onClick={() => handleRemove(item._id, "album")}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OwnProduct;
