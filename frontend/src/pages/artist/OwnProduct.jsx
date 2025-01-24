import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MdFavoriteBorder } from "react-icons/md";
import { AppContext } from "../../global/AppContext";
import { toast } from "react-toastify";

const OwnProduct = () => {
    const { artistId } = useContext(AppContext);
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    // Fetch data from the backend
    const fetchData = async () => {
        try {
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/artist/own-product",
                { artistId }
            );
            // setData(response.data);
            if (response.data.success) {
                console.log(response.data);
                setSongs(response.data.songs);
                setAlbums(response.data.album);
            } else {
                console.log(response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching music data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full text-white p-10">
            {/* Songs Section */}
            <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Songs</h2>
                <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] text-gray-400 text-sm font-medium mb-2 border-b border-gray-700 pb-2">
                    <div>#</div>
                    <div>Sound</div>
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
                        <div className="flex items-center gap-2">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-10 h-10 rounded-sm"
                            />
                            <span>{item.title}</span>
                        </div>
                        <div>{item.genre}</div>
                        <div className="flex items-center gap-1">
                            <MdFavoriteBorder />
                            <span>{item.likes}</span>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="bg-red-500 p-2 rounded mt-2"
                            >
                                Remove Song
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Albums Section */}
            <div>
                <h2 className="text-lg font-bold mb-4">Albums</h2>
                <div className="grid grid-cols-[1fr_2fr_1fr] text-gray-400 text-sm font-medium mb-2 border-b border-gray-700 pb-2">
                    <div>#</div>
                    <div>Album</div>
                    <div>Actions</div>
                </div>
                {albums.map((item, index) => (
                    <div
                        key={item._id}
                        className="grid grid-cols-[1fr_2fr_1fr] items-center text-sm mb-4 py-2 border-b border-gray-700"
                    >
                        <span>{index + 1}</span>
                        <div className="flex items-center gap-2">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded-sm"
                            />
                            <span>{item.name}</span>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="bg-red-500 text-white p-2 rounded mt-2"
                            >
                                Remove Album
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OwnProduct;
